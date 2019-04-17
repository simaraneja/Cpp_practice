/*
uniform float time;

void main() {
    float r = 0.5 + cos(time);
    float g = 0.2 + sin(time);
    float b = 0.0 + tan(time);
    vec3 rgb = vec3(r, g, b);
	gl_FragColor = vec4(rgb,1.0);
}
*/


/*
uniform float progress;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
varying vec2 vUV;
 
void main() {
   //gl_FragColor = texture2D(u_texture, vUV);
   gl_FragColor = mix(texture2D(u_texture1,vUV))
}
*/

varying vec2 vUV;
uniform bool effect;
const vec2 center = vec2(0.25,0.25);
const float SQRT_2 = 1.414213562373;
float smoothness = 0.3;
bool opening = true;  

uniform sampler2D from, to;
uniform float progress;

vec4 getFromColor(vec2 uv) 
{
    return texture2D(from,uv);
}
    
vec4 getToColor(vec2 uv) 
{
    return texture2D(to,uv);
}

vec4 transition_1 (vec2 uv) {
  float x = opening ? progress : 1.-progress;
  float m = smoothstep(-smoothness, 0.0, SQRT_2*distance(center, uv) - x*(1.+smoothness));
  return mix(getFromColor(uv), getToColor(uv), opening ? 1.-m : m);
}

vec4 transition_3(vec2 p) {
  float x = progress;
  x=smoothstep(.0,1.0,(x*2.0+p.x-1.0));
  return mix(getFromColor((p-.5)*(1.-x)+.5), getToColor((p-.5)*x+.5), x);
}

vec4 transition_2 (vec2 uv) 
{
  return mix( getFromColor(uv), getToColor(uv), progress );
}


void main() {
if(effect)
    gl_FragColor=transition_3(vUV);
else
    gl_FragColor=transition_2(vUV);
}
