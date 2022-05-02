import _ from 'lodash';

export default {
  install(app) {
    // first arg is where webpack should look for components
    // second arg is for webpack know if it should bother to look ffor subdirectories
    // third is the vue fie extension
    // this fn will return the info from the file
    const baseComponents = require.context('../components/base/', false, /[A-Za-z0-9-_,\s].vue$/i);
    baseComponents.keys().forEach((filename) => {
      // webpack will import the component and return the componenet config object
      const componentConfiguration = baseComponents(filename);

      // first we remove the characters . / fom the filename
      // second we remove teh extension name
      // example ./ButtonGeneric.vue => ButtonGeneric
      const componentName = _.upperFirst(_.camelCase(filename.replace(/^\.\//, '').replace(/\.\w+$/, '')));

      // export default usualy is the way webpack sets the info, so we check for that and apply
      // the config info fom the default key, otherwise we use directly the config info
      app.component(`Base${componentName}`, componentConfiguration.default || componentConfiguration);
    });
  }
};
