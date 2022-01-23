class Collision{
	//a method to check if a polygon is outside the screen with width and height
	//checking if the polygon is outside the screen by
	//go throught all the vertices of the polygon
	//if any of the vertices is outside the screen return true
	//else return false
	border(polygon, width, height){
		var i;
		const vertices = polygon.vertices;
		for(i=0; i<vertices.length; i++){
			var x = vertices[i].x + polygon.position.x,
				y = vertices[i].y + polygon.position.y;
			if(x < -width/2 || x > width/2 || y < -height/2 || y > height/2){
				return true;
			}
		}
		return false;
	}

	//check for collision between polygons by
	//pick a polygon that has the smallest vertices number
	//and loop through all the vertices of the other polygon
	//and check if the point is inside the polygon using ray casting
	polygonPolygon(polygon1, polygon2){
		var i;
		var collide = false;

		const p1 = () => {
			for(i=0; i<polygon1.vertices.length; i++){
				collide = checkCollision({
					x: polygon1.vertices[i].x + polygon1.position.x,
					y: polygon1.vertices[i].y + polygon1.position.y
				}, polygon2);
				if(collide) return true;
			}
		}
		const p2 = () => {
			for(i=0; i<polygon2.vertices.length; i++){
				collide = checkCollision({
					x: polygon2.vertices[i].x + polygon2.position.x,
					y: polygon2.vertices[i].y + polygon2.position.y
				}, polygon1) 
				if(collide) return true;
			}
		}

		if(polygon1.vertices.length > polygon2.vertices.length){
			p1();
			p2();
		}else {
			p2();
			p1();
		}

		return false;
	}

	//using ray casting from the point to the very right
	//if the point is inside the polygon the number of intersections is odd
	//if the point is outside the polygon the number of intersections is even
	pointPolygon(point, polygon){
		var i;
		var intersect = 0;
		const vertices = polygon.vertices;

		const p = {
			x: point.x, 
			y: point.y
		};

		for(i=0; i<vertices.length; i++){
			const a = {
				x: vertices[i].x + polygon.position.x,
				y: vertices[i].y + polygon.position.y
			}
			const next = vertices[i+1] || vertices[0]; 
			const b = {
				x: next.x + polygon.position.x,
				y: next.y + polygon.position.y
			}

			if(p.y > Math.min(a.y, b.y) && p.y < Math.max(a.y, b.y) ){
				if(p.x > Math.max(a.x, b.x)) continue;

				//get x value from segment a and b by knowing by from p.y
				const x = (p.y - a.y) * (b.x - a.x) / (b.y - a.y) + a.x;
				if(x > p.x) intersect++;
			}else continue;
		}
		return intersect % 2 === 1;
	}	
}
