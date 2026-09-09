# Name: Script_FormElementsOnRules

## Goal
The goal is to gray out elements in forms according to defined rules and disable selection.

## How to
How can you customize this script for your own use? There aren't many changes needed, but let's take it step by step.

1. First, take `#FormID` from your HTML structure and insert it into line 2.

2. Line 6 begins the definition of the rules that determine which elements should be grayed out. Of course, this requires that several fields (I used `radio_groups`) be defined later in the form, each containing more than two elements. Take a look at this code snippet:

```
  const disableRules = {
    field_1_name: {
      'field_1_element_2': {
        field_2_name: ['field_2_element'],
        field_3_name: ['field_3_element']
      }
    }
  };
  ````

And now for the details of the first rule. Suppose you have defined a field named `field_1_name`, and when the element `field_1_element_2` is selected, the elements `field_2_element` and `field_3_element` should be disabled in the subsequent fields named `field_2_name` and `field_3_name`.

That's it.

3. Unless you're looking for a way to define multiple rules that affect the selections in different fields. In that case, you can define them using the same format within the `disableRules` section.
I've added an example of this to the code and commented it out.

## A few closing remarks
I hope this tip was helpful and I wish success in realize your project.
But keep in mind that I'm not perfect, so this code might not be either. If you have any suggestions for improvement, just open a new ISSUE or start a PR.