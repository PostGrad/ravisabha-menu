import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { eventListData } from "./eventlistData";
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
});

const useAppStore = create(
  devtools(
    persist(appStore, {
      name: "appStore",
    })
  )
);

export default useAppStore;
