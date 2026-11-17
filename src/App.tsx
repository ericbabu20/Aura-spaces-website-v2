import { MotionConfig } from 'motion/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { policyPages } from './content/policies'
import AboutPage from './pages/AboutPage'
import ComingSoonPage from './pages/ComingSoonPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import InteriorsPage from './pages/InteriorsPage'
import KitchensPage from './pages/KitchensPage'
import NotFoundPage from './pages/NotFoundPage'
import PlatformPage from './pages/PlatformPage'
import PolicyPage from './pages/PolicyPage'
import RefurbishmentPage from './pages/RefurbishmentPage'

export default function App() {
  return (
    // "user" follows the visitor's reduced-motion setting for all motion on the site.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="kitchens" element={<KitchensPage />} />
            <Route path="interiors" element={<InteriorsPage />} />
            <Route path="refurbishment" element={<RefurbishmentPage />} />
            <Route path="platform" element={<PlatformPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />

            <Route path="studio" element={<ComingSoonPage pageKey="studio" />} />
            <Route path="furniture" element={<ComingSoonPage pageKey="furniture" />} />
            <Route path="decor" element={<ComingSoonPage pageKey="decor" />} />

            <Route path="privacy" element={<PolicyPage policy={policyPages.privacy} />} />
            <Route path="cookies" element={<PolicyPage policy={policyPages.cookies} />} />
            <Route path="terms" element={<PolicyPage policy={policyPages.terms} />} />

            {/* Redirects from retired or renamed addresses */}
            <Route path="price-estimator" element={<Navigate to="/studio" replace />} />
            <Route path="smart-living" element={<Navigate to="/platform" replace />} />
            <Route path="aura-furniture" element={<Navigate to="/furniture" replace />} />
            <Route path="aura-decor" element={<Navigate to="/decor" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}