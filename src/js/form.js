//import '../sass/complaints-form.scss';
import '../sass/pages/complaint-form/_index.scss';

// import $ from 'jquery';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/collapse';


import MultiForm from './components/MultiForm';


MultiForm('.multiform');

const helpTexts = {
    "online" : 'Podaj numer zamówienia oraz adres e-mail w celu weryfikacji',
    "local" : 'Podaj ID produktu, który chcesz zareklamować',
}

const complaintForm = document.getElementById('complaint-form');

const form = {
    element : complaintForm,
    children : complaintForm.elements,
    length : complaintForm.elements.length
};

for (let i = 0; i < form.length; i++) {

    let element = form.children[i];

    if ( element.nodeName === "FIELDSET") {
    
        let id = element.id.replace('fieldset-','');

        let helpText = element.querySelector('.fieldset__info');
        
        if ( ! ('fieldset' in form) ) form['fieldset'] = {};
            
        form["fieldset"][id] = {
            helpText
        };

    } else if ( element.nodeName === "INPUT" && element.name === 'orderresize[item][shop_type]') {
        
        element.addEventListener('change', (e) => {
            
            let { helpText } = form.fieldset.details;
            
            let filterableFields = form.element.querySelectorAll('[data-filter]');

            filterableFields.forEach(field => {
                field.dataset.filter === e.target.value ? field.classList.remove('hide') : field.classList.add('hide');
            });

            helpText.innerText = helpTexts[e.target.value];

        });

    } else if ( element.nodeName === "INPUT" && element.name === 'orderresize[item][delivery_type]') {
    
        element.addEventListener('change', (e) => {
            
            let shippingForms = form.element.querySelectorAll('[data-shipping-method]');

            shippingForms.forEach(shippingForm => {
                shippingForm.dataset.shippingMethod === e.target.value ? shippingForm.classList.remove('hide') : shippingForm.classList.add('hide')
            });
        });
    }
}

console.log(form);
// console.log(formElements);

// const purchaseTypeRadios = formElements['orderresize[item][shop_type]'];

// const fieldsetOrderDetails = form.querySelector('#fieldset-order-details');





// console.log(orderDetails);

// const detailsInputs = {
//     "1" : [
//         formElements['orderresize[item][nr_zam]'],
//         formElements['orderresize[item][contact_email]'],
//         formElements['orderresize[item][order_item_id]'],
//         document.getElementById('search-order'),
//     ],
//     "2" : [
//         formElements['orderresize[item][product_code]']
//     ]
// }

// const shippingRadios =  formElements['orderresize[item][delivery_type]'];
// const shippingFieldSets = document.querySelectorAll('[data-shipping-method]');

// shippingRadios.forEach(radio => {
//     let form = document.querySelector(`[data-shipping-method="${radio.value}"]`);
//     radio.addEventListener('change', (e) => {
//         shippingFieldSets.forEach(fieldset => fieldset !== form ? fieldset.classList.add('hide') : fieldset.classList.remove('hide') );
//     });
// });


// purchaseTypeRadios.forEach(radio => {
//     radio.addEventListener('change', (e) => {
//         console.log(orderDetails[e.target.value].helpText);
      
//     });
// });

// function updateComplaintTab(id) {
//     console.log(id);
//     switch(id) {
//         case "1":
//             showFormGroup(formElements['orderresize[item][nr_zam]']);
//             showFormGroup(formElements['orderresize[item][contact_email]']);
//         break;
//         case "2":
//             hideFormGroup(formElements['orderresize[item][nr_zam]']);
//             hideFormGroup(formElements['orderresize[item][contact_email]']);
//         break;
//         default:
//             showFormGroup(formElements['orderresize[item][nr_zam]']);
//             showFormGroup(formElements['orderresize[item][contact_email]']);
//         break;
//     }
// }

// function showInputs(items){
//     items.forEach(item => {
//         if (isWrapped(item)) {
//             item.closest('.form-group').classList.remove('hide');
//         } else {
//             item.classList.remove('hide');
//         }
//     });
// }

// function hideInputs(items){
//     items.forEach(item => {
//         if (isWrapped(item)) {
//             item.closest('.form-group').classList.add('hide');
//         } else {
//             item.classList.add('hide');
//         }
//     });
// }

// function isWrapped(item) {
//     return WRAPPED_ELEMS.includes(item.nodeName);
// }

// function hideFormGroup(input) {
//     input.closest('.form-group').classList.add('hide');
// }

// function showFormGroup(input) {
//     input.closest('.form-group').classList.remove('hide');
// }






