import { SharedFormComponents } from './form-components.po';
import { FormFieldType } from './form-field-type.model';
import { FormField } from './form-field.model';
import { Visibility } from './visibility.model';

const form = new SharedFormComponents();

export function typeInFormField(key: string, value: any, visibility: Visibility = Visibility.Visible): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .then(($element) => {
      if (($element && value && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        cy.wrap($element).clear();
        cy.wrap($element).type(value.toString());
      }
    });
}

export function typeInFilterSelectField(key: string, value: any, visibility: Visibility = Visibility.Visible): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .within(($element) => {
      if (($element && value && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        form.getFilterSelect().then(() => {
          typeInInputField(value);
        });
      }
    });
}

export function typeInAsyncFilterSelectField(
  key: string,
  value: any,
  visibility: Visibility = Visibility.Visible,
  requestToAwait: string = ''
): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .within(($element) => {
      if (($element && value && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        form.getFilterSelect();
        cy.get('input').within(($inputElement) => {
          cy.wrap($inputElement).clear().click().type(`${value.toString()}`);
          cy.wait(requestToAwait);
          cy.wrap($inputElement).type(`{enter}`);
        });
      }
    });
}

export function clearFilterSelectField(key: string): void {
  form
    .getFormFieldBySelector(key)
    .should('exist')
    .within(($element) => {
      if ($element) {
        form.getFilterSelect().within(() => cy.get('.ng-clear-wrapper').click());
      }
    });
}

export function typeInLastCascadedListField(
  key: string,
  value: string,
  visibility: Visibility = Visibility.Visible
): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .within(($element) => {
      if (($element && value && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        form.getCascadedList().within(() => {
          form
            .getFilterSelect()
            .last()
            .within(() => {
              typeInInputField(value);
            });
        });
      }
    });
}

export function typeInTagInputField(key: string, tags: string[], visibility: Visibility = Visibility.Visible): void {
  tags.forEach((tag) => {
    form
      .getFormFieldBySelector(key)
      .should(visibility)
      .type(`${String(tag)}{enter}`)
      .then(() => {
        cy.getElement('tag-name').should('contain.text', tag);
      });
  });
}

function typeInInputField(value: string): void {
  cy.get('input').within(($inputElement) => {
    cy.wrap($inputElement).clear().click().type(`${value.toString()}`).wait(200);
    cy.wrap($inputElement).type(`{enter}`);
  });
}

export function selectOptionFromDropdownList(
  key: string,
  value: any,
  visibility: Visibility = Visibility.Visible
): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .click()
    .then(($element) => {
      if ($element && (visibility === Visibility.Visible || visibility === Visibility.Exists)) {
        if (typeof value === 'number') {
          form.getOptionBySelector(key).eq(value).should('exist').click();
        } else {
          form.getOptionBySelector(key).first().should('exist').click();
        }
      }
    });
}

export function selectMultipleOptionsFromDropdownList(
  key: string,
  values: string[],
  visibility: Visibility = Visibility.Visible
): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .click()
    .then(($element) => {
      if (($element && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        for (const checkboxValue of values) {
          form.getCheckboxLabel().contains(checkboxValue).first().scrollIntoView().click();
        }
      }
    });
}

export function selectCheckboxValue(key: string, visibility: Visibility = Visibility.Visible): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .within(($element) => {
      if (($element && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        form.getCheckboxLabel().first().should(visibility).click();
      }
    });
}

export function selectRadioOption(key: string, option: string, visibility: Visibility = Visibility.Visible): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .within(($element) => {
      if (($element && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        form.getFormFieldBySelector(`${option}-radio`).should(visibility).click();
      }
    });
}

export function selectTodayFromDateTimePicker(
  key: string,
  value: unknown,
  selectWithTime: boolean,
  visibility: Visibility = Visibility.Visible
): void {
  form
    .getFormFieldBySelector(key)
    .should(visibility)
    .within(($element) => {
      if (($element && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
        form.getDatePickerToggle().should(visibility).click();
      }
    })
    .then(() => {
      cy.get('.mat-calendar-body-today', { withinSubject: null }).should(visibility).click();
    });

  if (selectWithTime) {
    form
      .getFormFieldBySelector(key)
      .should(visibility)
      .within(($element) => {
        if (($element && visibility === Visibility.Visible) || visibility === Visibility.Exists) {
          form
            .getFormFieldBySelector('hours')
            .should(visibility)
            .clear()
            .type(assertHoursMinutes(value) ? value.hours.toString() : '12');
          form
            .getFormFieldBySelector('minutes')
            .should(visibility)
            .clear()
            .type(assertHoursMinutes(value) ? value.minutes.toString() : '20');
        }
      });
  }
}

function assertHoursMinutes(value: unknown): value is { hours: number; minutes: number } {
  if (typeof value !== 'object') {
    return false;
  }
  const castedObject = value as { hours: number; minutes: number };

  return typeof castedObject.hours === 'number' && typeof castedObject.minutes === 'number';
}

export function fillForm(fields: FormField[]): void {
  fields.forEach((field) => {
    const editable = field.editable === false ? Visibility.NotExists : Visibility.Visible;
    switch (field.type) {
      case FormFieldType.Select:
        selectOptionFromDropdownList(field.key, field.value, editable);
        break;
      case FormFieldType.MultiSelect:
        selectMultipleOptionsFromDropdownList(field.key, field.value, editable);
        break;
      case FormFieldType.Checkbox:
        selectCheckboxValue(field.key, editable);
        break;
      case FormFieldType.Radio:
        selectRadioOption(field.key, field.value, editable);
        break;
      case FormFieldType.DatePicker:
        selectTodayFromDateTimePicker(field.key, field.value, false, editable);
        break;
      case FormFieldType.DateTimePicker:
        selectTodayFromDateTimePicker(field.key, field.value, true, editable);
        break;
      case FormFieldType.FilterSelect:
        typeInFilterSelectField(field.key, field.value, editable);
        break;
      case FormFieldType.AsyncFilterSelect:
        typeInAsyncFilterSelectField(field.key, field.value, editable, field.requestToAwait);
        break;
      case FormFieldType.CascadedList:
        typeInLastCascadedListField(field.key, field.value, editable);
        break;
      case FormFieldType.TextArea:
        cy.invokeValue(`${field.key}-input`, field.value);
        break;
      default:
        typeInFormField(field.key, field.value, editable);
        break;
    }
  });
}

export function validateForm(fields: FormField[]): void {
  fields.forEach((field) => {
    form.getFormFieldLabel(field.key).should('exist');

    if (field.validateValue && field.value) {
      switch (field.type) {
        case FormFieldType.Text:
        case FormFieldType.Number:
        case FormFieldType.TextArea:
          form.getFormFieldBySelector(field.key).should('have.value', field.value);
          break;
        case FormFieldType.CascadedList:
          form
            .getFormFieldBySelector(field.key)
            .should('exist')
            .within(() => {
              field.value.forEach((value: string) => {
                form.getCascadedList().should('contain.text', value);
              });
            });
          break;
        case FormFieldType.DatePicker:
        case FormFieldType.DateTimePicker:
        default:
          form.getFormFieldValue(field.key).should('contain', field.value);
          break;
      }
    }
  });
}
