import { useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { siteConfig } from '../../config/site.config'
import { contactCopy } from '../../content/pages'

export const PROJECT_TYPES = ['Kitchen', 'Fitted interiors', 'Refurbishment', 'Not sure yet'] as const
// Shown on the contact form, not on the homepage dock.
export const FORM_PROJECT_TYPES = [...PROJECT_TYPES, 'Aura Portal'] as const

// /contact?project=<slug> preselects the project type (used by the homepage dock and the portal page).
export const PROJECT_PARAM = 'project'
export const projectSlug = (type: string) => type.toLowerCase().replace(/\s+/g, '-')
const projectFromSlug = (slug: string | null) => FORM_PROJECT_TYPES.find((t) => projectSlug(t) === slug) ?? ''

// Budget is described in words rather than amounts, so the site shows no prices.
export const BUDGET_OPTIONS = ['Modest', 'Mid-range', 'Larger project', 'Not sure yet'] as const

export const PLATFORM_OPTIONS = ['Yes', 'Maybe later', 'No'] as const

export const CONTACT_METHODS = ['Email', 'Phone', 'Either'] as const

interface FormValues {
  fullName: string
  email: string
  phone: string
  postcode: string
  projectType: string
  budget: string
  platformInterest: string
  description: string
  contactMethod: string
  consent: boolean
  company: string // honeypot: real users never see or fill this
}

const EMPTY: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  postcode: '',
  projectType: '',
  budget: '',
  platformInterest: '',
  description: '',
  contactMethod: '',
  consent: false,
  company: '',
}

type Errors = Partial<Record<keyof FormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UK_PHONE_RE = /^(\+44|0)\d{9,10}$/
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i

export function validate(values: FormValues): Errors {
  const errors: Errors = {}
  if (values.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone.trim()) {
    const digits = values.phone.replace(/[\s()-]/g, '')
    if (!UK_PHONE_RE.test(digits)) errors.phone = 'Please enter a UK phone number, such as 07123 456789.'
  }
  if (!UK_POSTCODE_RE.test(values.postcode.trim())) errors.postcode = 'Please enter a valid UK postcode.'
  if (!values.projectType) errors.projectType = 'Please choose a project type.'
  if (!values.budget) errors.budget = 'Please choose an approximate budget.'
  if (!values.platformInterest) errors.platformInterest = 'Please let us know if you are interested in the Aura Portal.'
  if (values.description.trim().length < 10) errors.description = 'Please tell us a little about your project.'
  if (!values.contactMethod) errors.contactMethod = 'Please choose how you would like us to contact you.'
  if (!values.consent) errors.consent = 'Please agree to the privacy notice so we can respond to you.'
  return errors
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [searchParams] = useSearchParams()
  const [values, setValues] = useState<FormValues>(() => ({
    ...EMPTY,
    projectType: projectFromSlug(searchParams.get(PROJECT_PARAM)),
  }))
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (values.company) return // honeypot filled: treat as spam and do nothing

    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    const { company: _honeypot, ...payload } = values
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        // text/plain avoids a CORS preflight, which Apps Script endpoints do not handle.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...payload,
          source: window.location.pathname,
          submittedAt: new Date().toISOString(),
        }),
      })
      // Only a confirmed, successful response counts as sent.
      if (!response.ok) throw new Error(`Endpoint responded with ${response.status}`)
      setStatus('success')
      setValues(EMPTY)
    } catch (err) {
      console.warn('Contact form submission failed:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-result" role="status">
        <h3 className="h3">{contactCopy.success.title}</h3>
        <p>{contactCopy.success.text}</p>
      </div>
    )
  }

  const err = (key: keyof FormValues) => (errors[key] ? `err-${key}` : undefined)

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby={status === 'error' ? 'form-error' : undefined}>
      {status === 'error' ? (
        <div id="form-error" className="form-error" role="alert">
          <h3 className="h3">{contactCopy.error.title}</h3>
          <p>
            {contactCopy.error.text}
            {siteConfig.email ? (
              <>
                {' '}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </>
            ) : null}
          </p>
        </div>
      ) : null}

      {/* Honeypot: hidden from people and screen readers. Bots tend to fill it in. */}
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
          />
        </label>
      </div>

      <div className="field-row">
        <Field id="field-fullName" label="Full name" error={errors.fullName} errorId="err-fullName">
          <input
            id="field-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            aria-invalid={!!errors.fullName}
            aria-describedby={err('fullName')}
            onChange={(e) => update('fullName', e.target.value)}
          />
        </Field>
        <Field id="field-email" label="Email" error={errors.email} errorId="err-email">
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={err('email')}
            onChange={(e) => update('email', e.target.value)}
          />
        </Field>
      </div>

      <div className="field-row">
        <Field id="field-phone" label="Phone (optional)" error={errors.phone} errorId="err-phone" hint="UK numbers only">
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : 'hint-phone'}
            onChange={(e) => update('phone', e.target.value)}
          />
        </Field>
        <Field id="field-postcode" label="Postcode" error={errors.postcode} errorId="err-postcode">
          <input
            id="field-postcode"
            name="postcode"
            type="text"
            autoComplete="postal-code"
            value={values.postcode}
            aria-invalid={!!errors.postcode}
            aria-describedby={err('postcode')}
            onChange={(e) => update('postcode', e.target.value)}
          />
        </Field>
      </div>

      <div className="field-row">
        <Field id="field-projectType" label="Project type" error={errors.projectType} errorId="err-projectType">
          <select
            id="field-projectType"
            name="projectType"
            value={values.projectType}
            aria-invalid={!!errors.projectType}
            aria-describedby={err('projectType')}
            onChange={(e) => update('projectType', e.target.value)}
          >
            <option value="">Choose one</option>
            {FORM_PROJECT_TYPES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="field-budget" label="Approximate budget" error={errors.budget} errorId="err-budget">
          <select
            id="field-budget"
            name="budget"
            value={values.budget}
            aria-invalid={!!errors.budget}
            aria-describedby={err('budget')}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">Choose one</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="field-row">
        <Field
          id="field-platformInterest"
          label="Interested in the Aura Portal or smart home features?"
          error={errors.platformInterest}
          errorId="err-platformInterest"
        >
          <select
            id="field-platformInterest"
            name="platformInterest"
            value={values.platformInterest}
            aria-invalid={!!errors.platformInterest}
            aria-describedby={err('platformInterest')}
            onChange={(e) => update('platformInterest', e.target.value)}
          >
            <option value="">Choose one</option>
            {PLATFORM_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="field-contactMethod" label="Preferred contact method" error={errors.contactMethod} errorId="err-contactMethod">
          <select
            id="field-contactMethod"
            name="contactMethod"
            value={values.contactMethod}
            aria-invalid={!!errors.contactMethod}
            aria-describedby={err('contactMethod')}
            onChange={(e) => update('contactMethod', e.target.value)}
          >
            <option value="">Choose one</option>
            {CONTACT_METHODS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="field-description" label="Tell us about your project" error={errors.description} errorId="err-description">
        <textarea
          id="field-description"
          name="description"
          rows={5}
          value={values.description}
          aria-invalid={!!errors.description}
          aria-describedby={err('description')}
          onChange={(e) => update('description', e.target.value)}
        />
      </Field>

      <Field id="field-consent" label="" error={errors.consent} errorId="err-consent" inline>
        <label className="consent">
          <input
            id="field-consent"
            type="checkbox"
            name="consent"
            checked={values.consent}
            aria-invalid={!!errors.consent}
            aria-describedby={err('consent')}
            onChange={(e) => update('consent', e.target.checked)}
          />
          <span>I agree that Aura Spaces can use these details to respond to my enquiry, as set out in the privacy notice.</span>
        </label>
      </Field>

      <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send my enquiry'}
      </button>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  error?: string
  errorId: string
  hint?: string
  inline?: boolean
  children: ReactNode
}

function Field({ id, label, error, errorId, hint, inline, children }: FieldProps) {
  return (
    <div className={`field${error ? ' has-error' : ''}${inline ? ' field-inline' : ''}`}>
      {label && !inline ? (
        <label htmlFor={id}>
          {label}
        </label>
      ) : null}
      {children}
      {hint && !error ? (
        <span className="field-hint" id={`hint-${id.replace('field-', '')}`}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="field-error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
