document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#FormID');
  if (!form) return;


  const disableRules = {
    field_1_name: {
      'field_1_element_2': {
        field_2_name: ['field_2_element_1'],
        field_3_name: ['field_3_element_3']
      }
    }
    // Don't forget to put a comma after the next curly brace when you define additional rules.
  }

/*  
   // additional Rule, if needed
    field_4_name: {
      'field_4_element': {
        field_2_name: ['field_2_element_1']
      },
      'field_4_element': {
        field_2_name: ['field_2_element_2']
      }
    }
*/

  };

  function setOptionState(radio, active) {
    const optionWrapper = radio.closest('.form-check');
    const label = form.querySelector('label[for="' + radio.id + '"]');

    radio.disabled = !active;

    if (optionWrapper) {
      optionWrapper.style.opacity = active ? '1' : '0.45';
      optionWrapper.style.cursor = active ? '' : 'not-allowed';
    }

    if (label) {
      label.style.cursor = active ? '' : 'not-allowed';
    }

    // Reset a selection that is no longer valid
    if (!active && radio.checked) {
      radio.checked = false;
    }
  }

  function updateOptions() {
    // First, reset all target options that appear in the rules.
    Object.values(disableRules).forEach(rulesByValue => {
      Object.values(rulesByValue).forEach(targetRules => {
        Object.keys(targetRules).forEach(targetGroup => {
          form.querySelectorAll(
            'input[name="form[' + targetGroup + ']"]'
          ).forEach(radio => {
            setOptionState(radio, true);
          });
        });
      });
    });

    // Then apply all the rules that currently apply together.
    Object.keys(disableRules).forEach(controlName => {
      const selectedControl = form.querySelector(
        'input[name="form[' + controlName + ']"]:checked'
      );

      if (!selectedControl) return;

      const targetRules =
        disableRules[controlName][selectedControl.value];

      if (!targetRules) return;

      Object.entries(targetRules).forEach(([targetGroup, disabledValues]) => {
        form.querySelectorAll(
          'input[name="form[' + targetGroup + ']"]'
        ).forEach(radio => {
          const isDisabled = disabledValues.includes(radio.value);
          setOptionState(radio, !isDisabled);
        });
      });
    });
  }

  // Monitor all radio inputs for each control panel.
  Object.keys(disableRules).forEach(controlName => {
    form.querySelectorAll(
      'input[name="form[' + controlName + ']"]'
    ).forEach(radio => {
      radio.addEventListener('change', updateOptions);
    });
  });

  updateOptions();
});
