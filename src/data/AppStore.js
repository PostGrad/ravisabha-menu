import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { eventDetailsData, eventListData } from "./eventlistData";
import { MenuItems } from "./eventStore";
import {
  Beverages,
  DairyItems,
  DisposableItems,
  Grocery,
  OtherExpenses,
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
  OtherExpenses: OtherExpenses,
  Units: Units,
  Users: Users,
  Roles: Roles,
  LoggedInUser: {
    email: "pranay@patel.com",
    userName: "Pranay Patel",
    role: ["super"],
  },
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
      let isNewEventDetails = false;
      let tempEventDetailsData = state.eventDetailsData.find(
        (eve) => eve.eventId === currentEventDetailRecord.eventId
      );
      console.log("tempEventDetailsData before ==>> ", tempEventDetailsData);

      if (!tempEventDetailsData) {
        isNewEventDetails = true;
        tempEventDetailsData = {
          eventId: currentEventDetailRecord.eventId,
          vegetableExpenses: [],
          groceryExpenses: [],
          beveragesExpenses: [],
          dairyItemsExpenses: [],
          disposableItemsExpenses: [],
          otherExpenses: [],
        };
      }
      tempEventDetailsData = structuredClone(tempEventDetailsData);

      if (currentEventDetailRecord.placeholder === "Vegetables") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.vegetableExpenses.length + 1;

        tempEventDetailsData.vegetableExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }
      if (currentEventDetailRecord.placeholder === "Grocery") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.groceryExpenses.length + 1;

        tempEventDetailsData.groceryExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }
      if (currentEventDetailRecord.placeholder === "Beverages") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.beveragesExpenses.length + 1;

        tempEventDetailsData.beveragesExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }
      if (currentEventDetailRecord.placeholder === "Dairy Items") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.dairyItemsExpenses.length + 1;

        tempEventDetailsData.dairyItemsExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }
      if (currentEventDetailRecord.placeholder === "Disposable Items") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.disposableItemsExpenses.length + 1;

        tempEventDetailsData.disposableItemsExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }
      if (currentEventDetailRecord.placeholder === "Other Expenses") {
        currentEventDetailRecord.expenseObj.itemId =
          tempEventDetailsData.otherExpenses.length + 1;

        tempEventDetailsData.otherExpenses.push(
          currentEventDetailRecord.expenseObj
        );
      }

      console.log("tempEventDetailsData after ==>> ", tempEventDetailsData);

      let tempState = state.eventDetailsData.map((eve) =>
        eve.eventId === currentEventDetailRecord.eventId
          ? tempEventDetailsData
          : eve
      );

      console.log("State after update details ====>>>>> ", tempState);

      if (isNewEventDetails) {
        return {
          eventDetailsData: [...state.eventDetailsData, tempEventDetailsData],
        };
      } else {
        return {
          eventDetailsData: state.eventDetailsData.map((eve) =>
            eve.eventId === currentEventDetailRecord.eventId
              ? tempEventDetailsData
              : eve
          ),
        };
      }
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

      if (placeholder === "Grocery") {
        let tempGroceryExpenses = tempEventDetailsData.groceryExpenses.filter(
          (rec) => rec.itemId !== itemId
        );
        tempEventDetailsData.groceryExpenses = [...tempGroceryExpenses];
        console.log("tempGroceryExpenses ==>> ", tempGroceryExpenses);
      }

      if (placeholder === "Beverages") {
        let tempExpenses = tempEventDetailsData.beveragesExpenses.filter(
          (rec) => rec.itemId !== itemId
        );
        tempEventDetailsData.beveragesExpenses = [...tempExpenses];
        console.log("tempBeveragesExpenses ==>> ", tempExpenses);
      }

      if (placeholder === "Dairy Items") {
        let tempExpenses = tempEventDetailsData.dairyItemsExpenses.filter(
          (rec) => rec.itemId !== itemId
        );
        tempEventDetailsData.dairyItemsExpenses = [...tempExpenses];
        console.log("tempDairyItemsExpenses ==>> ", tempExpenses);
      }

      if (placeholder === "Disposable Items") {
        let tempExpenses = tempEventDetailsData.disposableItemsExpenses.filter(
          (rec) => rec.itemId !== itemId
        );
        tempEventDetailsData.disposableItemsExpenses = [...tempExpenses];
        console.log("tempDisposableItemsExpenses ==>> ", tempExpenses);
      }

      if (placeholder === "Other Expenses") {
        let tempExpenses = tempEventDetailsData.otherExpenses.filter(
          (rec) => rec.itemId !== itemId
        );
        tempEventDetailsData.otherExpenses = [...tempExpenses];
        console.log("tempotherExpenses ==>> ", tempExpenses);
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
