import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConnectStore = defineStore('connect', {
    state: () => {
        return {
            user: []

})


//
 export const useStoreCounts = defineStore("storeCounts", {
  state: () => {
    return {
      counts: [
        // {
        //   id: 1,
        //   content: "Julaften",
        //   contentDate:
        //     "Wed Oct 17 2022 15:56:08 GMT+0200 (sentraleuropeisk sommertid)",
        // },
        // {
        //   id: 2,
        //   content: "Italia",
        //   contentDate:
        //     "Wed Oct 14 2022 16:56:08 GMT+0200 (sentraleuropeisk sommertid)",
        // },
        // {
        //   id: 3,
        //   content: "neida",
        //   contentDate:
        //     "Wed Oct 17 2023 16:56:08 GMT+0200 (sentraleuropeisk sommertid)",
        // },
        // {
        //   id: "4",
        //   content: "Biltur til Sverige med alle som skal",
        //   contentDate:
        //     "Wed Mar 26 2023 00:00:00 GMT+0200 (sentraleuropeisk sommertid)",
        // },
      ],
      countsLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      console.log("storeCounts.user.id", storeAuth.user.id);
      countsCollectionRef = collection(db, "counts");
      countsCollectionQuery = query(countsCollectionRef);
      //initialize database refs
      this.getCounts();
    },
    async getCounts() {
      this.countsLoaded = false;

      getCountsSnapshot = onSnapshot(
        countsCollectionQuery,
        (querySnapshot) => {
          let counts = [];
          querySnapshot.forEach((doc) => {
            let count = {
              id: doc.id,
              content: doc.data().content,
              contentDate: doc.data().contentDate,
            };
            counts.push(count);
          });

          this.counts = counts;
          this.countsLoaded = true;
        },
        (error) => {
          console.log("error message", error.message);
        }
      );
    },
    clearCounts() {
      this.counts = [];
      if (getCountsSnapshot) getCountsSnapshot(); //unsubscribe from any active listener
    },
    async addCount(newCountContent, newCountContentDate) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      await addDoc(countsCollectionRef, {
        content: newCountContent,
        contentDate: newCountContentDate,
        date,
      });
    },
    async deleteCount(idToDelete) {
      await deleteDoc(doc(countsCollectionRef, idToDelete));
    },
    async updateCount(id, content, contentDate) {
      await updateDoc(doc(countsCollectionRef, id), {
        content: content,
        contentDate: contentDate,
      });
    },
  },
  getters: {
    getCountContent: (state) => {
      return (id) => {
        return state.counts.filter((count) => count.id === id)[0].content;
      };
    },
    totalCountsCount: (state) => {
      return state.counts.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.counts.forEach((count) => {
        count += count.content.length;
      });
      return count;
    },
  },
});
