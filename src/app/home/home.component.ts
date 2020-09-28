import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private canvas: any;
	private textString: string;
	public polygonPositionHandler;
	public anchorWrapper;
	public actionHandler;
	public left1 = 0;
	public top1 = 0 ;
	public scale1x = 0 ;    
	public scale1y = 0 ;    
	public width1 = 0 ;    
	public height1 = 0 ;
	public topOffset = -1;
	public leftOffset = -1;
	public snap = 20;
	private size: any = {
		width: 500,
		height: 500
	};
	private OutputContent: string;
	public arrowUpIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAADVCAMAAAAywB1lAAAAZlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9w0rLEAAAAIHRSTlMAAQYJFBYZICw1OkJEYmN2d3yRkqeou8THzdzi5ev3/KP1A5cAAAABYktHRCHEbA0WAAABNklEQVRo3u3Wt3bDMBBEUdFJzrAsOaf5/690Y9oUibDYlbs39Z5X3AIHq1V769VBtv64PUTm+EWfF/HMsJP0fhbuJEnS01Ewc/0lSdI2aqyf3QSNx0Wsh53+9nYaNB7nth6Nx22jxiHriXHEes84YJ2UW7f13NhpvTR2WWeMPdZZY4d1Um1m65LxuPuocZd1xbjHenhQewbrJMua1i1jo3Xb2GRtMLZYm4wN1kk9K1pbjRvWduOqdYdxzbrLuGKd5NnCute4YN1vnLV2GOesXcYZ66TIfq29xjNrv/GedcB4ah0ynlhfPZb2vDh/Ld5uKo/j+aKzcf3r6NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOnf/onNzNd1k+/gbLsjfRTeea6wAAAABJRU5ErkJggg==";
	public arrowDownIcon = "data:image/png;base64,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";

	constructor() { }

	ngOnInit(): void {
		this.canvas = new fabric.Canvas('canvas', {
			hoverCursor: 'pointer',
			selection: true,
			selectionBorderColor: 'blue'
		});

		var thisObj = this;
		var arrowUpImg = document.createElement('img');
		arrowUpImg.src = this.arrowUpIcon;
		var arrowDownImg = document.createElement('img');
		arrowDownImg.src = this.arrowDownIcon;
		this.fabricControls(fabric.Object.prototype, arrowUpImg,'uparrow');
		this.fabricControls(fabric.Object.prototype, arrowDownImg,'downarrow');

		this.canvas.on('object:moving', function(options) {
  // Sets corner position coordinates based on current angle, width and height
  options.target.setCoords();

  // Don't allow objects off the canvas
  if (options.target.left < thisObj.snap) {
  	options.target.left = 0;
  }

  if (options.target.top < thisObj.snap) {
  	options.target.top = 0;
  }

  if ((options.target.width + options.target.left) > (thisObj.size.width - thisObj.snap)) {
  	options.target.left = thisObj.size.width - options.target.width;
  }

  if ((options.target.height + options.target.top) > (thisObj.size.height - thisObj.snap)) {
  	options.target.top = thisObj.size.height - options.target.height;
  }

  // Loop through objects
  /* console.log(thisObj.canvas);*/
  thisObj.canvas.forEachObject(function(obj) {
  	if (obj === options.target) return;

    // If objects intersect
    if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

    	var distX = ((obj.left + obj.width) / 2) - ((options.target.left + options.target.width) / 2);
    	var distY = ((obj.top + obj.height) / 2) - ((options.target.top + options.target.height) / 2);

      // Set new position
      thisObj.findNewPos(distX, distY, options.target, obj);
  }

    // thisObj.Snap objects to each other horizontally

    // If bottom points are on same Y axis
    if (Math.abs((options.target.top + options.target.height) - (obj.top + obj.height)) < thisObj.snap) {
      // thisObj.Snap target BL to object BR
      if (Math.abs(options.target.left - (obj.left + obj.width)) < thisObj.snap) {
      	options.target.left = obj.left + obj.width;
      	options.target.top = obj.top + obj.height - options.target.height;
      }

      // thisObj.Snap target BR to object BL
      if (Math.abs((options.target.left + options.target.width) - obj.left) < thisObj.snap) {
      	options.target.left = obj.left - options.target.width;
      	options.target.top = obj.top + obj.height - options.target.height;
      }
  }

    // If top points are on same Y axis
    if (Math.abs(options.target.top - obj.top) < thisObj.snap) {
      // thisObj.Snap target TL to object TR
      if (Math.abs(options.target.left - (obj.left + obj.width)) < thisObj.snap) {
      	options.target.left = obj.left + obj.width;
      	options.target.top = obj.top;
      }

      // thisObj.Snap target TR to object TL
      if (Math.abs((options.target.left + options.target.width) - obj.left) < thisObj.snap) {
      	options.target.left = obj.left - options.target.width;
      	options.target.top = obj.top;
      }
  }

    // thisObj.Snap objects to each other vertically

    // If right points are on same X axis
    if (Math.abs((options.target.left + options.target.width) - (obj.left + obj.width)) < thisObj.snap) {
      // thisObj.Snap target TR to object BR
      if (Math.abs(options.target.top - (obj.top + obj.height)) < thisObj.snap) {
      	options.target.left = obj.left + obj.width - options.target.width;
      	options.target.top = obj.top + obj.height;
      }

      // thisObj.Snap target BR to object TR
      if (Math.abs((options.target.top + options.target.height) - obj.top) < thisObj.snap) {
      	options.target.left = obj.left + obj.width - options.target.width;
      	options.target.top = obj.top - options.target.height;
      }
  }

    // If left points are on same X axis
    if (Math.abs(options.target.left - obj.left) < thisObj.snap) {
      // thisObj.Snap target TL to object BL
      if (Math.abs(options.target.top - (obj.top + obj.height)) < thisObj.snap) {
      	options.target.left = obj.left;
      	options.target.top = obj.top + obj.height;
      }

      // thisObj.Snap target BL to object TL
      if (Math.abs((options.target.top + options.target.height) - obj.top) < thisObj.snap) {
      	options.target.left = obj.left;
      	options.target.top = obj.top - options.target.height;
      }
  }
});

  options.target.setCoords();

  // If objects still overlap

  var outerAreaLeft = null,
  outerAreaTop = null,
  outerAreaRight = null,
  outerAreaBottom = null;

  thisObj.canvas.forEachObject(function(obj) {
  	if (obj === options.target) return;

  	if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

  		var intersectLeft = null,
  		intersectTop = null,
  		intersectWidth = null,
  		intersectHeight = null,
  		intersectSize = null,
  		targetLeft = options.target.left,
  		targetRight = targetLeft + options.target.width,
  		targetTop = options.target.top,
  		targetBottom = targetTop + options.target.height,
  		objectLeft = obj.left,
  		objectRight = objectLeft + obj.width,
  		objectTop = obj.top,
  		objectBottom = objectTop + obj.height;

      // Find intersect information for X axis
      if (targetLeft >= objectLeft && targetLeft <= objectRight) {
      	intersectLeft = targetLeft;
      	intersectWidth = obj.width - (intersectLeft - objectLeft);

      } else if (objectLeft >= targetLeft && objectLeft <= targetRight) {
      	intersectLeft = objectLeft;
      	intersectWidth = options.target.width - (intersectLeft - targetLeft);
      }

      // Find intersect information for Y axis
      if (targetTop >= objectTop && targetTop <= objectBottom) {
      	intersectTop = targetTop;
      	intersectHeight = obj.height - (intersectTop - objectTop);

      } else if (objectTop >= targetTop && objectTop <= targetBottom) {
      	intersectTop = objectTop;
      	intersectHeight = options.target.height - (intersectTop - targetTop);
      }

      // Find intersect size (thisObj will be 0 if objects are touching but not overlapping)
      if (intersectWidth > 0 && intersectHeight > 0) {
      	intersectSize = intersectWidth * intersectHeight;
      }

      // Set outer snapping area
      if (obj.left < outerAreaLeft || outerAreaLeft == null) {
      	outerAreaLeft = obj.left;
      }

      if (obj.top < outerAreaTop || outerAreaTop == null) {
      	outerAreaTop = obj.top;
      }

      if ((obj.left + obj.width) > outerAreaRight || outerAreaRight == null) {
      	outerAreaRight = obj.left + obj.width;
      }

      if ((obj.top + obj.height) > outerAreaBottom || outerAreaBottom == null) {
      	outerAreaBottom = obj.top + obj.height;
      }

      // If objects are intersecting, reposition outside all shapes which touch
      if (intersectSize) {
      	var distX = (outerAreaRight / 2) - ((options.target.left + options.target.width) / 2);
      	var distY = (outerAreaBottom / 2) - ((options.target.top + options.target.height) / 2);

        // Set new position
        thisObj.findNewPos(distX, distY, options.target, obj);
    }
}
});
});
		//this.canvas.on( 'object:moving', e => this.preventMoveLeaving(e));
		this.canvas.on( 'object:scaling', e => this.preventLeaving(e));
		this.textString = null;
		this.canvas.setWidth(this.size.width);
		this.canvas.setHeight(this.size.height);
		this.OutputContent = null;
		this.addLine();
		this.addRect();
		this.addPoly();
	}
	fabricControls(fabricObject,arrowImg, type)
	{

		var renderIcon = function(icon) {
			return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
				console.log();
				if(fabricObject.get('type') == "line")
				{
					var size = this.cornerSize;
					ctx.save();
					ctx.translate(left, top);
					ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
					ctx.drawImage(icon, -size/2, -size/2, size, size);
					ctx.restore();
				}

			}
		}
		if(type == "uparrow")
		{
			fabricObject.controls.deleteControl = new fabric.Control({
				x: -0.3,
				y: -0.5,
				offsetY: -16,
				offsetX: 16,
				cursorStyle: 'pointer',
				render: renderIcon(arrowImg),
				cornerSize: 24
			});
		}
		else if(type == "downarrow")
		{
			fabricObject.controls.clone = new fabric.Control({
				x: 0,
				y: 30,
				offsetY: -16,
				offsetX: 16,
				cursorStyle: 'pointer',
				render: renderIcon(arrowImg),
				cornerSize: 24
			});
		}
	}
	preventMoveLeaving(e){
		//var obj = e.target;
		var obj = this.canvas.getActiveObject();
		if (obj.top < 0 + this.topOffset) obj.top = 0 + this.topOffset; // top
		if (obj.left < 0 + this.leftOffset) obj.left = 0 + this.leftOffset; // left
		if (obj.top + obj.height > this.canvas.height)
			obj.top = this.canvas.height - obj.height; // bottom
		if (obj.left + obj.width > this.canvas.width)
			obj.left = this.canvas.width - obj.width; // right
		this.canvas.renderAll();
	}
	preventLeaving(e){
	//	var obj = this.canvas.getActiveObject();

	var obj = e.target;
	obj.setCoords();
	var brNew = obj.getBoundingRect();

	if (((brNew.width+brNew.left)>=obj.canvas.width) || ((brNew.height+brNew.top)>=obj.canvas.height) || ((brNew.left<0) || (brNew.top<0))) {
		obj.left = this.left1;
		obj.top= this.top1;
		obj.scaleX= this.scale1x;
		obj.scaleY= this.scale1y;
		obj.width= this.width1;
		obj.height= this.height1;
	}
	else{    
		this.left1 =obj.left;
		this.top1 =obj.top;
		this.scale1x = obj.scaleX;
		this.scale1y=obj.scaleY;
		this.width1=obj.width;
		this.height1=obj.height;
	}
	this.canvas.renderAll();
}
findNewPos(distX, distY, target, obj) {
  // See whether to focus on X or Y axis
  if (Math.abs(distX) > Math.abs(distY)) {
  	if (distX > 0) {
  		target.left = obj.left - target.width;
  	} else {
  		target.left = obj.left + obj.width;
  	}
  } else {
  	if (distY > 0) {
  		target.top = obj.top - target.height;
  	} else {
  		target.top = obj.top + obj.height;
  	}
  }
}
addRect() {
	let rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 120,
		height: 120,
		objectCaching: false,
		transparentCorners: false,
		cornerColor: 'blue'
	});
	this.extend(rect, this.randomId());
	this.canvas.add(rect);
	this.selectItemAfterAdded(rect);
}
addPoly() {
	var points = [
	{x: 200, y: 0},
	{x: 250, y: 50},
	{x: 250, y: 100},
	{x: 150, y: 100},
	{x: 150, y: 50} 
	];
	let poly = new fabric.Polygon(points, {
		left: 100,
		top: 50,
		fill: '#D81B60',
		strokeWidth: 1,
		stroke: 'black',
		scaleX: 1,
		scaleY: 1,
		objectCaching: false,
		transparentCorners: false,
		cornerColor: 'blue',
	});

	poly.cornerStyle = 'circle';
	poly.cornerColor = 'rgba(0,0,255,0.5)';

	this.setPolyControl(poly);
	this.extend(poly, this.randomId());
	this.canvas.add(poly);
	this.selectItemAfterAdded(poly);
}
setPolyControl(poly){
	var lastControl = poly.points.length - 1;
	let polygonPositionHandler = function (dim, finalMatrix, fabricObject) {
		var X = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
		Y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
		let p = new fabric.Point(X, Y);
		return fabric.util.transformPoint(
			p,
			fabric.util.multiplyTransformMatrices(
				fabricObject.canvas.viewportTransform,
				fabricObject.calcTransformMatrix()
				)
			);
	};
	let anchorWrapper = function(anchorIndex, fn) {
		return function(eventData, transform, x, y) {
			let fabricObject = transform.target;
			let X = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
			Y = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y);
			let p = new fabric.Point(X, Y);
			let absolutePoint = fabric.util.transformPoint( p, fabricObject.calcTransformMatrix()),
			actionPerformed = fn(eventData, transform, x, y),
			newDim = fabricObject._setPositionDimensions({}),
			polygonBaseSize = fabricObject._getNonTransformedDimensions(),
			newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
			newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
			fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
			return actionPerformed;
		}
	};
	let actionHandler = function(eventData, transform, x, y) {
		let polygon = transform.target,
		currentControl = polygon.controls[polygon.__corner],
		mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
		polygonBaseSize = polygon._getNonTransformedDimensions(),
		size = polygon._getTransformedDimensions(0, 0),
		finalPointPosition = {
			x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
			y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
		};
		polygon.points[currentControl.pointIndex] = finalPointPosition;
		return true;
	};
	poly.controls = poly.points.reduce(function(acc, point, index) {
		acc['p' + index] = new fabric.Control({
			positionHandler: polygonPositionHandler,
			actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
			actionName: 'modifyPolygon',
			pointIndex: index
		});
		return acc;
	}, { });
}
addLine() {
	let line = new fabric.Line([200, 100, 100, 100], {
		left: 120,
		top: 120,
		stroke: 'black',
		cornerColor: 'blue'
	})
	line.setControlsVisibility({
		mt: false, 
		mb: false, 
		ml: false, 
		mr: false, 
		tr: false, 
		bl: false, 
	});		
	this.extend(line, this.randomId());
	this.canvas.add(line);
	this.selectItemAfterAdded(line);
}
addText() {
	let text = new fabric.IText('textString', {
		left: 10,
		top: 10,
		fontFamily: 'helvetica',
		angle: 0,
		fill: '#000000',
		scaleX: 0.5,
		scaleY: 0.5,
		fontWeight: '',
		hasRotatingPoint: true
	});
	this.extend(text, this.randomId());
	this.canvas.add(text);
	this.selectItemAfterAdded(text);
}
extend(obj, id) {
	obj.toObject = (function (toObject) {
		return function () {
			return fabric.util.object.extend(toObject.call(this), {
				id: id
			});
		};
	})(obj.toObject);
}
//======= this is used to generate random id of every object ===========
randomId() {
	return Math.floor(Math.random() * 999999) + 1;
}
//== this function is used to active the object after creation ==========
selectItemAfterAdded(obj) {
	this.canvas.discardActiveObject().renderAll();
	this.canvas.setActiveObject(obj);
}

}
