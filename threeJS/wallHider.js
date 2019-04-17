var startPoint = object.getWorldPosition();
var direction = object.getWorldDirection();
var walls = [];
var wallChildren = [];
var wallEdges = [];
var wallCeilings = [];
var deltaCamHeight = 50;
//console.log(foyrFPEditor.activelayer.groundsurface.ceilings)
//console.log(foyrFPEditor.activelayer.wallgroup.walledges);

wallCeilings = Object.values(foyrFPEditor.activelayer.groundsurface.ceilings);
if(wallCeilings){
    if(startPoint.y > ( editor.getCeilingHeight())){
        wallCeilings.forEach(function(ceiling){
            ceiling.visible = false;
        })
    }
    else{
        wallCeilings.forEach(function(ceiling){
            ceiling.visible = true;
        })
    }

}

//console.log(foyrFPEditor.activelayer.groundsurface.ceilings);
wallEdges = Object.values(editor.activelayer.wallgroup.walledges);

if(wallEdges){
    wallEdges.forEach(function(wallEdge){
        walls.push(wallEdge.mesh3DLeftWall);
        walls.push(wallEdge.mesh3DRightWall);
    });
}

if(walls){
    if((startPoint.y < (editor.getCeilingHeight() + deltaCamHeight))/* || (startPoint.y - editor.getCeilingHeight() < deltaCamHeight )*/){

        console.log(startPoint.y);
        //this.raycaster.set( object.getWorldPosition(), object.getWorldDirection() );
        //this.raycaster.setFromCamera(this.mouse,object );
        this.raycaster.set(startPoint, direction );

        intersects  = this.raycaster.intersectObjects(walls);

        if(intersects.length > 0){
            var intersect = intersects[0].object;
            //console.log(intersect);

            if(tempIntersect !== intersect){
                if((intersect.type === "wallleft")/* || (intersect.type === "wallright")*/){
                    if(tempIntersect){
                        console.log(tempIntersect);
                        tempIntersect.sourceWall.material.visible = true;//.y = 0;
                        tempIntersect.sourceWall.mesh3DLeftWall.material.visible = true;
                        tempIntersect.sourceWall.mesh3DRightWall.material.visible  = true;
                        wallChildren = tempIntersect.sourceWall.children;
                        wallChildren.forEach(function(child) {
                            child.visible = true;
                        });

                        wallChildren = tempIntersect.sourceWall.children;
                        if(wallChildren){
                            wallChildren.forEach(function(child){
                                child.visible = true;
                            });
                        }
                        wallChildren = tempIntersect.sourceWall.mesh3DLeftWall.children;
                        if(wallChildren){
                            wallChildren.forEach(function(child){
                                child.visible = true;
                            });
                        }
                        wallChildren = tempIntersect.sourceWall.mesh3DRightWall.children;
                        if(wallChildren){
                            wallChildren.forEach(function(child){
                                child.visible = true;
                            });
                        }
                        //tempIntersect2.material.visible = true;
                    }
                    console.log(intersect);
                    intersect.sourceWall.material.visible = false;//.y = 0;
                    intersect.sourceWall.mesh3DLeftWall.material.visible = false;
                    intersect.sourceWall.mesh3DRightWall.material.visible = false;
                    wallChildren = intersect.sourceWall.children;
                    if(wallChildren){
                        wallChildren.forEach(function(child){
                            child.visible = false;
                        });
                    }
                    wallChildren = intersect.sourceWall.mesh3DLeftWall.children;
                    if(wallChildren){
                        wallChildren.forEach(function(child){
                            child.visible = false;
                        });
                    }
                    wallChildren = intersect.sourceWall.mesh3DRightWall.children;
                    if(wallChildren){
                        wallChildren.forEach(function(child){
                            child.visible = false;
                        });
                    }
                    tempIntersect = intersect;
                    //tempIntersect2 = intersect2;
                }
            }
            //this.viewport.requestRender();
        }
        /*else {
         if(tempIntersect){
         tempIntersect.sourceWall.material.visible = true;//.y = 0;
         tempIntersect.sourceWall.mesh3DLeftWall.material.visible = true;
         tempIntersect.sourceWall.mesh3DRightWall.material.visible  = true;
         wallChildren = tempIntersect.sourceWall.children;
         wallChildren.forEach(function(child) {
         child.visible = true;
         });

         wallChildren = tempIntersect.sourceWall.children;
         if(wallChildren){
         wallChildren.forEach(function(child){
         child.visible = true;
         });
         }
         wallChildren = tempIntersect.sourceWall.mesh3DLeftWall.children;
         if(wallChildren){
         wallChildren.forEach(function(child){
         child.visible = true;
         });
         }
         wallChildren = tempIntersect.sourceWall.mesh3DRightWall.children;
         if(wallChildren){
         wallChildren.forEach(function(child){
         child.visible = true;
         });
         }
         tempIntersect = 0;
         }
         }*/
    }
    else {
        tempIntersect = 0;
        walls.forEach(function(wall){
            wall.sourceWall.material.visible = true;//.y = 0;
            wall.sourceWall.mesh3DLeftWall.material.visible = true;
            wall.sourceWall.mesh3DRightWall.material.visible  = true;
            wallChildren = wall.sourceWall.children;
            wallChildren.forEach(function(child) {
                child.visible = true;
            });

            wallChildren = wall.sourceWall.children;
            if(wallChildren){
                wallChildren.forEach(function(child){
                    child.visible = true;
                });
            }
            wallChildren = wall.sourceWall.mesh3DLeftWall.children;
            if(wallChildren){
                wallChildren.forEach(function(child){
                    child.visible = true;
                });
            }
            wallChildren = wall.sourceWall.mesh3DRightWall.children;
            if(wallChildren){
                wallChildren.forEach(function(child){
                    child.visible = true;
                });
            }
        });

    }
}
