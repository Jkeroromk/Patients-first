import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from './forms/PatientForm';
import { Control } from 'react-hook-form';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';



interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const CustomFormField = ({
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    renderSkeleton
}: CustomProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField
                        field={field}
                        fieldType={fieldType}
                        placeholder={placeholder}
                        iconSrc={iconSrc}
                        iconAlt={iconAlt}
                        disabled={disabled}
                    />

                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

const RenderField = ({
    field,
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
}: {
    field: any;
    fieldType: FormFieldType;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
}) => {
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <img
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={24}
                            width={24}
                            className='ml-2 mr-2'
                        />
                    )}
                    <FormControl>
                    <Input
                        {...field}
                        placeholder={placeholder}
                        className='shad-input border-0'
                    />
                    </FormControl>
                </div>
            );
        case FormFieldType.PHONE_INPUT:
            return (
                    <FormControl>
                    <PhoneInput
                    defaultCountry='US'
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as undefined}
                    onChange={field.onChange}
                    className='input-phone'
                    />
                    </FormControl>
            );
        default:
            return <div />;
    }
}

export default CustomFormField;
