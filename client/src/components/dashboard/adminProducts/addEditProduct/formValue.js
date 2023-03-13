import * as Yup from 'yup';

export const formValues = {
    model: '',
    brand: '',
    frets: '',
    woodtype: '',
    description: '',
    price: '',
    available: '',
    shipping: false,
    images: []
};

export const getValuesToEdit = (product) => {
    return {
        model: product.model,
        brand: product.brand._id,
        frets: product.frets,
        woodtype: product.woodtype,
        description: product.description,
        price: product.price,
        available: product.available,
        shipping: product.shipping,
        images: product.images
    }
};

export const validation = () => (
    Yup.object({
        model: Yup.string()
            .required('Model is required'),
        brand: Yup.string()
            .required('Brand is required'),
        frets: Yup.number()
            .required('Frets is required')
            .oneOf([20, 21, 22, 24], 'Only 20, 21, 22, 24 allowed'),
        woodtype: Yup.string()
            .required('Woodtype is required'),
        description: Yup.string()
            .required('Desciprtion is required'),
        price: Yup.number()
            .required('Must enter price')
            .min(100, 'Minimum is $100')
            .max(5000, 'Maximum is $5000'),
        available: Yup.number()
            .required('Do we have stock ?'),
        shipping: Yup.boolean()
            .required('Do we offer shipping'),
    })
)