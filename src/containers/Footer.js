import React from 'react'

import Footer from '~/components/Collections/Footer/Footer'
const footerSections = [
  {
    icon: 'mapMarkerAlt',
    text: 'Based in Chester, UK',
  },
  {
    icon: 'envelope',
    text: 'kaloyan@bozhkov.com',
    type: 'link',
    href: 'mailto:kaloyan@bozhkov.com',
  },
  {
    icon: 'phone',
    text: '+44 7743583472',
    type: 'link',
    href: 'tel:+44 7743583472',
  },
  {
    icon: 'linkedin',
    text: 'Kaloyan Bozhkov',
    type: 'link',
    href: 'https://www.linkedin.com/in/kaloyan-bozhkov-6a0205159/',
  },
  {
    icon: 'github',
    text: 'kaloyanBozhkov',
    type: 'link',
    href: 'https://github.com/kaloyanBozhkov',
  },
]

const FooterContainer = () => {
  return <Footer footerSections={footerSections} />
}

export default FooterContainer
