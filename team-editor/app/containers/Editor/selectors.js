import { createSelector } from 'reselect';

/**
 * Direct selector to the editor state domain
 */
const selectEditorDomain = () => (state) => state.get('editor');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Editor
 */

const selectEditor = () => createSelector(
  selectEditorDomain(),
  (substate) => substate.toJS()
);

export default selectEditor;
export {
  selectEditorDomain,
};
