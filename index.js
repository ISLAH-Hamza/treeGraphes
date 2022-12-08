const TreeGraphe=()=>{
  
    let width,height,tree,floor,epsilon,stroke_width,color_main , color_second, margintop,TreesTitle

    const my=(selection)=>{ 

                let TreeScal=d3.scaleBand()

                    .domain(d3.range(0,Math.ceil(tree) )) 
                    .range([0,width])
                    .paddingInner(0.2)
                    .paddingOuter(0.1)

                //################################## 
                let data=[]
                for(let i=0; i<=floor;i++){data.push(1)}
               
                // ############## sigle tree constructionn ##############
                const tr = selection
                    .append('defs')
                        .append('g')
                        .attr('id','tree')                               
                        .attr('width', TreeScal.bandwidth() )   
                        .attr('stroke-width',stroke_width)   
                        .attr('stroke-linecap',"round")
                        .attr('fill','none')              
            
                tr
                .append('ellipse')
                    .attr('cx', TreeScal.bandwidth()/2)
                    .attr('cy', height/3 + margintop/2  )
                    .attr('rx',TreeScal.bandwidth()/2-stroke_width)
                    .attr('ry', height/3-stroke_width )

                tr
                .append('line')
                    .attr('x1', TreeScal.bandwidth()/2  )
                    .attr('x2', TreeScal.bandwidth()/2 )
                    .attr('y1', height/3 + margintop/2 )
                    .attr('y2', height )
                        
            
                tr
                .append('line')
                    .attr('x1', TreeScal.bandwidth()/2  )
                    .attr('x2', 2*TreeScal.bandwidth()/2.5 )
                    .attr('y1', height/2 + margintop/2 )
                    .attr('y2', height/4 +2*margintop/3)


                // ##### adding trees to svg and mask the last elemtn if it's less than 1
                selection
                    .selectAll('use')
                    .data(data.slice(0,Math.floor(tree)))
                    .join('use')
                        .attr('x',(d,i)=>(TreeScal(i)))
                        .attr("xlink:xlink:href",'#tree')
                        .attr('stroke',color_main)
        
            if(epsilon!=0){
                selection.append('mask')
                    .attr('id','masKE')
                    .append('rect')
                    .attr('x','0')
                    .attr('width', TreeScal.bandwidth()*epsilon )
                    .attr('height',height)
                    .attr('fill', 'white')
                
            selection.append('use')
                .attr('x',TreeScal(Math.floor(tree)) )
                .attr("xlink:xlink:href",'#tree')
                .attr('stroke',color_second)
            
            selection.append('use')
                .attr('x',TreeScal(Math.floor(tree)) )
                .attr("xlink:xlink:href",'#tree')
                .attr('stroke',color_main)
                .attr('mask','url(#masKE)')


                
            }


            // title
            selection
                .append('text')
                .text(TreesTitle)
                .attr('x','50%')
                .attr("text-anchor", "middle")  
                .attr('y', margintop/3)
            
    }
    // let width,height,tree,floor,epsilon,stroke_width,color_main , color_second, margintop
    my.width=function(_){ return arguments.length ? ( width = +_ , my) : width }
    my.height=function(_){ return arguments.length ? ( height = +_ , my) : height }
    my.stroke_width=function(_){ return arguments.length ? ( stroke_width = +_ , my) : stroke_width }
    my.color_main=function(_){ return arguments.length ? ( color_main = _ , my) : color_main }
    my.color_second=function(_){ return arguments.length ? ( color_second = _ , my) : color_second }
    my.margintop=function(_){ return arguments.length ? ( margintop = +_ , my) : margintop }
    my.tree=function(_){ return arguments.length ? ( tree = +_ ,floor=+Math.floor(+_), epsilon=tree-floor ,my) : height } 
    my.TreesTitle=function(_){ return arguments.length ? (TreesTitle = _ , my) :TreesTitle } 
    
    return my;

} 