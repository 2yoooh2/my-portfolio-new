import { useState, useEffect } from 'react';

import { supabase } from '@/lib/supabase';

/**
 * useProjects 커스텀 훅
 *
 * Supabase에서 프로젝트 목록을 가져오는 훅
 *
 * @param {number} limit - 가져올 프로젝트 수 [Optional]
 * @returns {object} { projects, loading, error }
 *
 * Example usage:
 * const { projects, loading, error } = useProjects(4);
 */
function useProjects(limit = null) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('portfolio_projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setProjects(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [limit]);

  return { projects, loading, error };
}

export default useProjects;
