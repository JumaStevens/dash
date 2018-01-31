import _merge from 'lodash.merge'

const options = {
  endpoint = '',
  resources = {}
}

export default {

  install (Vue, options) {
    Vue.prototype.$getResource = function(method, options) {
      // this "this" references "this" in this component
      let name = this.$options.resource
      // turn around and walk away if anything is missing
      if (!name || !resources[name] || !resources[name][method]) return;

      // get the API path and response resolver
      let { path, resolve } = resources[name][method](options)

      // methods return promises to keep chain alive
      const mappers = {
        // deep merge dataSet with component's $data
        merge: dataSet => {
          _merge(this.$data, dataSet)
          return Promise.resolve(dataSet)
        },
        // set $data props, accepts "dot.notation" string access
        set: dataSet => {
          Object.keys(dataSet).forEach(prop => {
            this.$set(this.$data, prop, dataSet[prop])
          })
          return Promise.resolve(dataSet)
        }
      }

      // fetch and parse resource then pass it to the resolver
      return fetch(endpoint + path)
        .then(response => response.json())
        .then(response => resolve(response, mappers))
    }
  }
}
