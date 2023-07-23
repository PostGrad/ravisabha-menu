import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { eventDetailsData, eventListData } from "./eventlistData";
import { MenuItems } from "./eventStore";
import {
  Beverages,
  DairyItems,
  DisposableItems,
  Grocery,
  Vegetables,
} from "./ingrediantsData";
import { Units } from "./Units";
import { Roles, Users } from "./userData";

const appStore = (set) => ({
  eventListData: eventListData,
  MenuItems: MenuItems,
  Vegetables: Vegetables,
  Grocery: Grocery,
  Beverages: Beverages,
  DairyItems: DairyItems,
  DisposableItems: DisposableItems,
  Units: Units,
  Users: Users,
  Roles: Roles,
  addEvent: (newEvent) => {
    set((state) => ({
      eventListData: [newEvent, ...state.eventListData],
    }));
  },
  updateEvent: (currentEvent) => {
    set((state) => {
      let tempEventListData = state.eventListData.filter(
        (eve) => eve.id !== currentEvent.id
      );
      return {
        eventListData: [currentEvent, ...tempEventListData],
      };
    });
  },
  deleteEvent: (currentEventId) => {
    set((state) => ({
      eventListData: state.eventListData.filter(
        (event) => event.id !== currentEventId
      ),
    }));
  },
  eventDetailsData: eventDetailsData,
  updateEventDetails: (currentEventDetailRecord) => {
    set((state) => {
      let tempEventDetailsData = state.eventDetailsData.find(
        (eve) => eve.eventId === currentEventDetailRecord.eventId
      );
      tempEventDetailsData = structuredClone(tempEventDetailsData);
      //console.log("tempEventDetailsData ==>> ", tempEventDetailsData);

      if (currentEventDetailRecord.placeholder === "Vegetables") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.vegetableExpenses.length + 1;

        tempEventDetailsData.vegetableExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }

      return {
        eventDetailsData: state.eventDetailsData.map((eve) =>
          eve.eventId === currentEventDetailRecord.eventId
            ? tempEventDetailsData
            : eve
        ),
      };
    });
  },
  deleteEventDetailRecord: ({ eventId, itemId, placeholder }) => {
    set((state) => {
      let tempEventDetailsData = state.eventDetailsData.find(
        (eve) => eve.eventId === eventId
      );
      tempEventDetailsData = structuredClone(tempEventDetailsData);
      console.log(
        "tempEventDetailsData.vegetableExpenses ==>> ",
        tempEventDetailsData.vegetableExpenses
      );
      console.log(
        "eventId, itemId, placeholder ==>> ",
        eventId,
        itemId,
        placeholder
      );
      if (placeholder === "Vegetables") {
        let tempVegetableExpenses =
          tempEventDetailsData.vegetableExpenses.filter(
            (rec) => rec.itemId !== itemId
          );
        tempEventDetailsData.vegetableExpenses = [...tempVegetableExpenses];
        console.log("tempVegetableExpenses ==>> ", tempVegetableExpenses);
      }

      //console.log("tempEventDetailsData ==>> ", tempEventDetailsData);

      return {
        eventDetailsData: state.eventDetailsData.map((eve) =>
          eve.eventId === eventId ? structuredClone(tempEventDetailsData) : eve
        ),
      };
    });
  },
});

const useAppStore = create(
  devtools(
    persist(appStore, {
      name: "appStore",
    })
  )
);

export default useAppStore;
