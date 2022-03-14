import {europe,roW} from './continents_data'

export const checkInside = (point0:number,point1:number) => {


  //let point = [ 40.0949248,  -3.6929535999999996];36.007892, -5.518177
    //const point = [40.446602, -3.696772]//[40.414356, -3.698821]


    const cont = europe;
    let vs = cont.polyon;
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    const x = point0, y = point1;

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1];
        const xj = vs[j][0], yj = vs[j][1];

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    if (inside === false){
  
    } else {
      return [cont.display_lat,cont.display_lng]
    }

return [cont.name,cont.display_lat,cont.display_lng]

};