export class SharedFormComponents {
  getRoute = () => cy.location('pathname');
  getForm = (selector: string) => cy.getElement(`${selector}-form`);

  getFormFieldLabel = (selector: string) => cy.getElement(`${selector}-label`);
  getFormFieldValue = (selector: string) => cy.getElement(`${selector}-value`);

  getCascadedList = () => cy.getElement(`cascaded-list`);
  getCheckboxLabel = () => cy.getElement(`checkbox-label`);
  getDatePickerToggle = () => cy.getElement(`date-picker-toggle`);
  getFilterSelect = () => cy.getElement(`filter-select`);

  getFormFieldBySelector = (selector: string) => cy.getElement(`${selector}-input`);
  getOptionByClass = () => cy.get(`.ng-option`);
  getOptionBySelector = (selector: string) => cy.getElement(`${selector}-option`, { withinSubject: null });

  getButtonBySelector = (selector: string) => cy.getElement(`${selector}-button`);
  getCancelButton = () => cy.getElement(`cancel-button`);
  getCloseButton = () => cy.getElement(`close-button`);
  getConfirmButton = () => cy.getElement(`confirm-button`);
  getCreateButton = () => cy.getElement(`create-button`);
  getDeleteButton = () => cy.getElement(`delete-button`);
  getDownloadButton = () => cy.getElement(`download-button`);
  getEditButton = () => cy.getElement(`edit-button`);
  getSubmitButton = () => cy.getElement(`submit-button`);
  getViewButton = () => cy.getElement(`view-button`);
  getLoadMoreButton = () => cy.getElement(`load-more-button`);

  clickButtonBySelector = (selector: string) => this.getButtonBySelector(selector).click();
  clickCancelButton = () => this.getCancelButton().click();
  clickCollapseButton = () => cy.getElement(`collapse-button`).click();
  clickConfirmButton = () => this.getConfirmButton().click();
  clickCloseButton = () => this.getCloseButton().click();
  clickCreateButton = () => this.getCreateButton().click();
  clickDeleteButton = () => this.getDeleteButton().click();
  clickEditButton = () => this.getEditButton().click();
  clickSubmitButton = () => this.getSubmitButton().click();
  clickViewButton = () => this.getViewButton().click();
  clickLoadMoreButton = () => this.getLoadMoreButton().click();
}
