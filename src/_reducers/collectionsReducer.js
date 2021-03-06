import { collectionsConstants } from '../_constants';

/* Initialized State...
  {
    collectionName1: [doc1, doc2],
    collectionName2: [doc3, doc4]...
  }
*/
const initialState = {}

export const collectionsReducer = (state = initialState, { type, payload: { model, data } = {} }) => {
  switch (type) {
    case collectionsConstants.GET_ALL:
      const collections = data.reduce((obj, collectionName) => {
        obj[collectionName] = [];
        return obj;
      }, {});

      return { ...collections, ...state };
    case collectionsConstants.ADD_COLLECTION_SUCCESS:
      const newCollectionName = data.name;

      return {
        ...state,
        [newCollectionName]: [],
      };
    case collectionsConstants.CLEAR_ALL:
      return {};
    case collectionsConstants.GET_SUCCESS:
      return {
        ...state,
        [model]: data,
      }
    case collectionsConstants.ADD_SUCCESS:
      const collectionToAddTo = state[model];
      const addedDoc = data;

      return {
        ...state,
        [model]: [ ...collectionToAddTo, addedDoc],
      }
    case collectionsConstants.UPDATE_SUCCESS:
    case collectionsConstants.REPLACE_SUCCESS:
      const updatedDoc = data;

      const collectionDocs = state[model].map((doc) => {
        return doc._id === updatedDoc._id ? updatedDoc : doc;
      });

      return {
        ...state,
        [model]: collectionDocs,
      };
    case collectionsConstants.DELETE_SUCCESS:
      const deletedDocId = data._id;

      const remainingDocs = state[model].filter(({ _id }) => _id !== deletedDocId);

      return {
        ...state,
        [model]: remainingDocs
      }

    default:
      return state;
  }
};

export default collectionsReducer;
