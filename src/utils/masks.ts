/**
 * Utility functions for input masks and formatting
 */

/**
 * Formats a CPF string with dots and dash (000.000.000-00)
 * @param value - The CPF string to format
 * @returns Formatted CPF string
 */
export function formatCPF(value: string): string {
   // Remove all non-digits
   const numbers = value.replace(/\D/g, '');

   // Apply mask: 000.000.000-00
   return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14); // Limit to 14 characters (including dots and dash)
}

/**
 * Formats a CEP string with dash (00000-000)
 * @param value - The CEP string to format
 * @returns Formatted CEP string
 */
export function formatCEP(value: string): string {
   // Remove all non-digits
   const numbers = value.replace(/\D/g, '');

   // Apply mask: 00000-000
   return numbers.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9); // Limit to 9 characters (including dash)
}

/**
 * Removes formatting from CPF (returns only numbers)
 * @param value - The formatted CPF string
 * @returns CPF with only numbers
 */
export function unformatCPF(value: string): string {
   return value.replace(/\D/g, '');
}

/**
 * Removes formatting from CEP (returns only numbers)
 * @param value - The formatted CEP string
 * @returns CEP with only numbers
 */
export function unformatCEP(value: string): string {
   return value.replace(/\D/g, '');
}

/**
 * Formats a phone number with Brazilian format ((00) 00000-0000)
 * @param value - The phone string to format
 * @returns Formatted phone string
 */
export function formatPhone(value: string): string {
   // Remove all non-digits
   const numbers = value.replace(/\D/g, '');

   // Apply mask based on length
   if (numbers.length <= 10) {
      // (00) 0000-0000
      return numbers
         .replace(/(\d{2})(\d)/, '($1) $2')
         .replace(/(\d{4})(\d)/, '$1-$2')
         .slice(0, 14);
   } else {
      // (00) 00000-0000
      return numbers
         .replace(/(\d{2})(\d)/, '($1) $2')
         .replace(/(\d{5})(\d)/, '$1-$2')
         .slice(0, 15);
   }
}

/**
 * Removes formatting from phone number (returns only numbers)
 * @param value - The formatted phone string
 * @returns Phone with only numbers
 */
export function unformatPhone(value: string): string {
   return value.replace(/\D/g, '');
}

/**
 * Formats a date input value (YYYY-MM-DD)
 * @param value - The date string to format
 * @returns Formatted date string
 */
export function formatDateInput(value: string): string {
   // Remove all non-digits
   const numbers = value.replace(/\D/g, '');

   // Apply mask: YYYY-MM-DD
   return numbers
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{2})(\d)/, '$1-$2')
      .slice(0, 10);
}

/**
 * Generic mask function that applies a pattern to a value
 * @param value - The value to format
 * @param pattern - The pattern to apply (use # for digits)
 * @returns Formatted value
 */
export function applyMask(value: string, pattern: string): string {
   const numbers = value.replace(/\D/g, '');
   let result = pattern;

   for (let i = 0; i < numbers.length && result.includes('#'); i++) {
      result = result.replace('#', numbers[i]);
   }

   // Remove remaining # symbols
   result = result.replace(/#/g, '');

   return result;
}
