#include <cmath>
#include <vector>
#include <algorithm>
#include <cstdint>
#include <cstring>

// Opaque projected tower triangles only. No texture, image deformation or depth billboards.
extern "C" void raster_tower(const float* v,int nv,const int32_t* tri,int nt,
 const double* c,int w,int h,int nativeHeight,uint8_t* out) {
 std::memset(out,0,w*h);
 const double pi=3.14159265358979323846, az=c[0]*pi/180,p=c[3]*pi/180;
 const double sa=sin(az),ca=cos(az),sp=sin(p),cp=cos(p),scale=double(h)/nativeHeight;
 const double focal=h/(2*tan(c[4]*pi/360));
 const double rx=-ca,ry=sa,ux=sa*sp,uy=ca*sp,uz=cp,fx=-sa*cp,fy=-ca*cp,fz=sp;
 std::vector<double> x(nv),y(nv);
 for(int i=0;i<nv;i++) {
  double a=v[3*i]-c[1]*sa,b=v[3*i+1]-c[1]*ca,z=v[3*i+2]-c[2],d=a*fx+b*fy+z*fz;
  if(d<=.1)return;
  x[i]=c[5]*scale+focal*(a*rx+b*ry)/d;
  y[i]=c[6]*scale-focal*(a*ux+b*uy+z*uz)/d;
  if(x[i]<1 || x[i]>w-2 || y[i]<1 || y[i]>h-2)return; // whole tower including mast must remain inside frame
 }
 for(int k=0;k<nt;k++) {
  int a=tri[3*k],b=tri[3*k+1],d=tri[3*k+2];
  double ax=x[a],ay=y[a],bx=x[b],by=y[b],dx=x[d],dy=y[d];
  double area=(bx-ax)*(dy-ay)-(by-ay)*(dx-ax);
  if(std::abs(area)<1e-9)continue;
  int x0=std::max(0,int(floor(std::min({ax,bx,dx})))),x1=std::min(w-1,int(ceil(std::max({ax,bx,dx}))));
  int y0=std::max(0,int(floor(std::min({ay,by,dy})))),y1=std::min(h-1,int(ceil(std::max({ay,by,dy}))));
  for(int yy=y0;yy<=y1;yy++)for(int xx=x0;xx<=x1;xx++) {
   double qx=xx+.5,qy=yy+.5;
   double e0=(bx-ax)*(qy-ay)-(by-ay)*(qx-ax),e1=(dx-bx)*(qy-by)-(dy-by)*(qx-bx),e2=(ax-dx)*(qy-dy)-(ay-dy)*(qx-dx);
   if((e0>=0&&e1>=0&&e2>=0)||(e0<=0&&e1<=0&&e2<=0))out[yy*w+xx]=255;
  }
 }
 // Fill enclosed holes by flood-filling background from outside, matching the QA definition.
 std::vector<uint8_t> seen(w*h,0);std::vector<int> queue;queue.reserve(w*h);queue.push_back(0);seen[0]=1;
 for(size_t k=0;k<queue.size();k++) {
  int i=queue[k],xx=i%w,yy=i/w;
  int neighbours[4]={xx>0?i-1:-1,xx+1<w?i+1:-1,yy>0?i-w:-1,yy+1<h?i+w:-1};
  for(int n:neighbours)if(n>=0&&!seen[n]&&!out[n]){seen[n]=1;queue.push_back(n);}
 }
 for(int i=0;i<w*h;i++)out[i]=seen[i]?0:255;
}
