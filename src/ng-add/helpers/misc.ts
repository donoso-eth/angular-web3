export function toUnder(camel: string) {
    let dash = camel.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
  
    if (dash.substring(0, 1) == '_') {
      dash = dash.substring(1, dash.length);
    }
    return dash;
  }