import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
})

export async function POST(req: NextRequest) {
    try {
        const { items, customerEmail, customerName } = await req.json()

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
        }

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'jpy',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price, // Amount in yen (no decimals)
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: customerEmail,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
            metadata: {
                customerName: customerName,
            },
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (err: any) {
        console.error('Stripe Error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
