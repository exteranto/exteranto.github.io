import Vue from 'vue'
import Vuex from 'vuex'
import config from 'config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    docs: {},
    snippets: {}
  },

  getters: {
    docs: state => state.docs
  },

  mutations: {
    updateDocs (state, { name, docs }) {
      state.docs[name] = docs
    },

    updateSnippets (state, { name, snippet }) {
      state.snippets[name] = snippet
    }
  },

  actions: {
    async loadDocs ({ commit, dispatch, state }, { name }) {
      if (state.docs[name]) {
        return state.docs[name]
      }

      return Vue.prototype.$http
        .get(`${config.s3}/${name}.json`)
        .then((response) => {
          commit('updateDocs', { name, docs: response.data })

          return response.data
        })
    },

    async loadSnippet ({ commit, dispatch, state }, { name }) {
      if (state.snippets[name]) {
        return state.snippets[name]
      }

      return Vue.prototype.$http
        .get(`${config.s3}/snippets/${name.replace('s3:', '')}`)
        .then((response) => {
          commit('updateSnippets', { name, snippet: response.data })

          return response.data
        })
    }
  }
})
