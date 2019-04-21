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

  // console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);

  entitiesTripPoints.data.forEach((pointEntity, i) => {
    // console.log('pointEntity', pointEntity);
    // console.log(formatDate(pointEntity.day, `DD MMM`));

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

    // console.log('oneDayTripPoint', oneDayTripPoint);

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
        // console.log(`updateDate [${i}]`, updateDate);
        return entitiesTripPoints.update(newData)
            .then((updatedData) => {
              entitiesTripPoints.data[i].update(updatedData);

              tripPoint.update(entitiesTripPoints.data[i]);
              // console.log('entitiesTripPoints', entitiesTripPoints);
              renderPoints(entitiesTripPoints);

              updateGeneralInfo(entitiesTripPoints.generalInfo);
              edtingMode = null;
            });
      };

      editTripPoint.onDelete = () => {
        // console.log(`onDelete [${i}]`, entitiesTripPoints.data[i]);

        return entitiesTripPoints.delete(entitiesTripPoints.data[i].id)
            .then(() => {
              // console.log(' entitiesTripPoints.update', updatedData);
              delete entitiesTripPoints.data[i];
              updateGeneralInfo(entitiesTripPoints.generalInfo);
              renderPoints(entitiesTripPoints);
              edtingMode = null;
            });
      };

      tripPoint.onEdit = () => {
        // console.log(edtingMode);
        if (edtingMode !== null) {
          edtingMode.close();
        }

        editTripPoint.update(pointEntity);
        editTripPoint.render();
        oneDayItems.replaceChild(editTripPoint.element, tripPoint.element);
        edtingMode = editTripPoint;
        tripPoint.unrender();

        // isEditMode = true;
      };

      tripPoint.onAddOffer = () => {
        // console.log(`updateDate [${i}]`);

        return entitiesTripPoints.update(tripPoint.toRaw)
            .then((updatedData) => {
              // console.log(' tripPoint.onAddOffer', updatedData);
              entitiesTripPoints.data[i].update(updatedData);
              tripPoint.update(entitiesTripPoints.data[i]);
              updateGeneralInfo(entitiesTripPoints.generalInfo, TypeInfo.TOTAL_PRICE);
            });
      };

      oneDayItems.appendChild(tripPoint.render());
    }
  });

  // console.log('daysTrip', daysTrip);

  return points;
};

const renderPoints = (pointsEntities) => {
  cleanNode(tripPointsContainer);
  const allDaysTrip = getPoints(pointsEntities);
  renderElements(tripPointsContainer, allDaysTrip);
};

export {cleanNode, renderElements, renderPoints};

