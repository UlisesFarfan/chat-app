import { ChangeEvent, ChangeEventHandler } from "react";
import { formikError } from "../formik/formik.interface";

export interface InputGnrlProps {
  className?: string;
  disabled?: boolean;
  helper?: formikError;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  onChange: (e: ChangeEvent<any>) => void;
  id: string;
  initialValue?: string;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
}

export interface InputPasswordProps {
  className?: string;
  disabled?: boolean;
  helper?: formikError;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  onChange?: (e: ChangeEvent<any>) => void;
  onChangeScore?: (score: number) => void;
  id: string;
  initialValue?: string;
  label?: string;
  placeholder: string;
  readOnly?: boolean;
  showStrengthBar?: boolean;
}

export interface InputTextProps {
  className?: string;
  disabled?: boolean;
  helper?: formikError;
  id: string;
  initialValue?: string;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
}