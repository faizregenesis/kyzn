export type InvoiceItemInput = {
    productId: string;
    productName: string;
    unitPrice: number; // in cents
    quantity: number;
};


export type InvoiceInput = {
    date: string; // ISO
    customerName: string;
    salespersonName: string;
    notes?: string;
    items: InvoiceItemInput[];
};