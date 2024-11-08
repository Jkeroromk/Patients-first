import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "./forms/PatientForm";
import { Control } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
  }
  

const CustomFormField = ({
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    renderSkeleton,
    showTimeSelect,
    dateFormat,
  }: CustomProps) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {/* Conditionally render label based on fieldType */}
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
  
            <RenderField
              field={field}
              fieldType={fieldType}
              placeholder={placeholder}
              iconSrc={iconSrc}
              iconAlt={iconAlt}
              renderSkeleton={renderSkeleton} 
              showTimeSelect={showTimeSelect}
              dateFormat={dateFormat}
            />
  
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    );
  };  

  const RenderField = ({ field, fieldType, placeholder, iconSrc, iconAlt, renderSkeleton, showTimeSelect, dateFormat }: 
    { 
      field: any; 
      fieldType: FormFieldType; 
      placeholder?: string; 
      iconSrc?: string; 
      iconAlt?: string; 
      renderSkeleton?: (field: any) => React.ReactNode; 
      showTimeSelect?: boolean; 
      dateFormat?: string;
    }) => {
    
    switch (fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <img
                src={iconSrc}
                alt={iconAlt || "icon"}
                height={24}
                width={24}
                className="ml-2 mr-2"
              />
            )}
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                className="shad-input border-0"
              />
            </FormControl>
          </div>
        );
      
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as undefined}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        );
      
      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
              className="ml-2"
            />
            <FormControl>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat={dateFormat ?? (showTimeSelect ? "MM/dd/yyyy hh:mm aa" : "MM/dd/yyyy")}
                showTimeSelect={showTimeSelect ?? false}
                timeInputLabel="Time:"
                wrapperClassName="date-picker"
              />
            </FormControl>
          </div>
        );
      case FormFieldType.SKELETON:
        return renderSkeleton ? renderSkeleton(field) : null;
  
      default:
        return <div />;
    }
  };
  

export default CustomFormField;
