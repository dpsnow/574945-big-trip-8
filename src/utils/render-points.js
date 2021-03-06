import {DayTrip} from '../day-trip/day-trip.js';

import {Point} from '../trip-points/point.js';
import {PointEdit} from '../trip-points/point-edit.js';
import {TypeInfo} from '../trip-constants.js';

import {formatDate, renderElements, cleanNode} from './utils.js';
import {updateGeneralInfo} from './update-general-info.js';

const tripPointsContainer = document.querySelector(`.trip-points`);

const getPoints = (entitiesTripPoints) => {
  let oneDayTrip;
  let edtingMode = null;
  const points = [];
  let dayTrip;

  entitiesTripPoints.data.forEach((pointEntity, i) => {
    if (pointEntity === null || pointEntity.destination === undefined) {
      return;
    }

    let currentDay = pointEntity.getDay(entitiesTripPoints.generalInfo.startDate);
    let currentDate = pointEntity.date;
    let oneDayItems;

    if (dayTrip !== currentDay) {
      oneDayTrip = new DayTrip(currentDay, formatDate(currentDate, `DD MMM`));
      oneDayTrip.render();
      dayTrip = currentDay;
    }

    if (pointEntity.isVisible) {
      const tripPoint = new Point(pointEntity);
      const editTripPoint = new PointEdit(pointEntity);

      points.push(oneDayTrip.element);
      oneDayItems = oneDayTrip.containerForPoints;
      editTripPoint.onCancelEditMode = () => {
        tripPoint.render();
        oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
        editTripPoint.unrender();
        edtingMode = null;
      };

      editTripPoint.onSubmit = (newData) => {
        return entitiesTripPoints.update(newData)
          .then((updatedData) => {
            entitiesTripPoints.data[i].update(updatedData);
            tripPoint.update(entitiesTripPoints.data[i]);
            renderPoints(entitiesTripPoints);
            updateGeneralInfo(entitiesTripPoints.generalInfo);
            edtingMode = null;
          });
      };

      editTripPoint.onDelete = () => {
        return entitiesTripPoints.delete(entitiesTripPoints.data[i].id)
          .then(() => {
            delete entitiesTripPoints.data[i];
            updateGeneralInfo(entitiesTripPoints.generalInfo);
            renderPoints(entitiesTripPoints);
            edtingMode = null;
          });
      };

      tripPoint.onEdit = () => {
        if (edtingMode !== null) {
          edtingMode.close();
        }
        editTripPoint.update(pointEntity);
        editTripPoint.render();
        oneDayItems.replaceChild(editTripPoint.element, tripPoint.element);
        edtingMode = editTripPoint;
        tripPoint.unrender();
      };

      tripPoint.onAddOffer = () => {
        return entitiesTripPoints.update(tripPoint.toRaw)
          .then((updatedData) => {
            entitiesTripPoints.data[i].update(updatedData);
            tripPoint.update(entitiesTripPoints.data[i]);
            updateGeneralInfo(entitiesTripPoints.generalInfo, TypeInfo.TOTAL_PRICE);
          });
      };

      oneDayItems.appendChild(tripPoint.render());
    }
  });
  return points;
};

const renderPoints = (pointsEntities) => {
  cleanNode(tripPointsContainer);
  const allDaysTrip = getPoints(pointsEntities);
  renderElements(tripPointsContainer, allDaysTrip);
};

export {cleanNode, renderElements, renderPoints};

