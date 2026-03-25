import { useEffect, useMemo, useState } from 'react'
import { fetchCollection } from '../utils/api'
import {
  FALLBACK_EXPERIENCE,
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  FALLBACK_SKILLS,
  FALLBACK_TESTIMONIALS,
} from '../utils/fallbackData'

const DATASET_CONFIG = {
  projects: {
    path: '/projects/featured',
    fallback: FALLBACK_PROJECTS,
  },
  services: {
    path: '/services',
    fallback: FALLBACK_SERVICES,
  },
  skills: {
    path: '/skills',
    fallback: FALLBACK_SKILLS,
  },
  testimonials: {
    path: '/testimonials',
    fallback: FALLBACK_TESTIMONIALS,
  },
  experience: {
    path: '/experience',
    fallback: FALLBACK_EXPERIENCE,
  },
}

const INITIAL_DATA = {
  projects: [],
  services: [],
  skills: [],
  testimonials: [],
  experience: [],
}

const usePortfolioData = () => {
  const [data, setData] = useState(INITIAL_DATA)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setLoading(true)
      const entries = Object.entries(DATASET_CONFIG)
      const settled = await Promise.allSettled(
        entries.map(([, config]) => fetchCollection(config.path)),
      )

      if (!isMounted) {
        return
      }

      const nextData = {}
      const nextErrors = {}

      settled.forEach((result, index) => {
        const [key, config] = entries[index]
        if (result.status === 'fulfilled') {
          nextData[key] = result.value
          return
        }

        nextData[key] = config.fallback
        nextErrors[key] = result.reason?.message || 'Could not load this section.'
      })

      setData(nextData)
      setErrors(nextErrors)
      setLoading(false)
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [reloadToken])

  const reload = () => setReloadToken((prev) => prev + 1)

  return useMemo(
    () => ({
      ...data,
      loading,
      errors,
      hasErrors: Object.keys(errors).length > 0,
      reload,
    }),
    [data, loading, errors],
  )
}

export default usePortfolioData
