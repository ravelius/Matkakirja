import bpy
import math
import json
import time
from pathlib import Path
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

ROOT = Path(__file__).resolve().parent
START = time.time()
CFG=json.loads((ROOT/'configuration.json').read_text())
MAST_TOP=CFG['mast_top']
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1.0
scene.render.engine = 'CYCLES'
scene.cycles.samples = 48
scene.cycles.use_denoising = True
scene.render.threads_mode = 'FIXED'
scene.render.threads = 4
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.resolution_percentage = 100
scene.render.pixel_aspect_x = scene.render.pixel_aspect_y = 1.0
scene.view_settings.view_transform = 'AgX'
scene.view_settings.exposure=-2.5
device = {'engine': 'CYCLES', 'device': 'CPU', 'blender': bpy.app.version_string}
try:
    pref = bpy.context.preferences.addons['cycles'].preferences
    pref.compute_device_type = 'METAL'
    pref.get_devices()
    found = [d for d in pref.devices if d.type == 'METAL']
    if found:
        for d in pref.devices:
            d.use = d.type == 'METAL'
        scene.cycles.device = 'GPU'
        device.update(device='METAL', devices=[d.name for d in found])
except Exception as e:
    device['deviceProbeError'] = str(e)
print('DEVICE', json.dumps(device), flush=True)

def rgb(hexcode):
    q = [int(hexcode[i:i+2], 16)/255 for i in (0, 2, 4)]
    return tuple(x/12.92 if x <= .04045 else ((x+.055)/1.055)**2.4 for x in q)

def material(name, color, metal=0, rough=.5, transmission=0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*rgb(color), 1)
    m.use_nodes = True
    bs = m.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = (*rgb(color), 1)
    bs.inputs['Metallic'].default_value = metal
    bs.inputs['Roughness'].default_value = rough
    bs.inputs['Transmission Weight'].default_value = transmission
    return m

M = {
 'steel': material('Painted cool blue gray steel estimate', 'ACAFB2', .38, .34),
 'trim': material('Pale steel window frames', 'D0D0CC', .2, .4),
 'cream': material('Cream plaster estimate', 'EFE3C0', 0, .78),
 'roof': material('Gray standing seam roof estimate', '9DA9AD', .48, .4),
 'glass': material('Glazing estimate', '777E83', .12, .17, .35),
 'dark': material('Interior recess', '26343A', .05, .7),
 'red': material('Blank dark red panels', '773530', .0, .6),
 'green': material('Green lantern metal', '316B60', .45, .35),
 'wood': material('Stair treads approximation', '95999B', 0, .65),
 'concrete': material('Support shoes', 'A8A9A1', 0, .8),
 'grass': material('Neutral park ground placeholder', '718952', 0, 1),
 'gravel': material('Gravel apron placeholder', 'B9B39D', 0, .95),
}
# All tower parts are actual geometry. Target images are never used as textures.
buckets = {}
def bucket(name, mat='steel', role='body'):
    if name not in buckets:
        buckets[name] = {'v': [], 'f': [], 'mat': mat, 'role': role}
    return buckets[name]

def face(b, points):
    i = len(b['v']); b['v'].extend([tuple(p) for p in points]); b['f'].append(tuple(range(i,i+len(points))))

def rod(b, a, c, radius=.07, sides=8):
    a, c = Vector(a), Vector(c); axis = (c-a).normalized()
    ref = Vector((0,0,1)) if abs(axis.z) < .9 else Vector((0,1,0))
    u = axis.cross(ref).normalized(); v = axis.cross(u).normalized(); k = len(b['v'])
    for p in (a,c):
        for j in range(sides):
            b['v'].append(tuple(p + radius*(math.cos(j*2*math.pi/sides)*u+math.sin(j*2*math.pi/sides)*v)))
    b['f'].append(tuple(k+j for j in reversed(range(sides))))
    b['f'].append(tuple(k+sides+j for j in range(sides)))
    for j in range(sides):
        n = (j+1)%sides; b['f'].append((k+j,k+n,k+sides+n,k+sides+j))

def box(b, center, du, dv, dz):
    p = Vector(center); u=Vector(du)/2; v=Vector(dv)/2; z=Vector((0,0,dz/2)); k=len(b['v'])
    b['v'].extend([tuple(p+s*u+t*v+w*z) for w in (-1,1) for t in (-1,1) for s in (-1,1)])
    for f in [(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]:b['f'].append(tuple(k+x for x in f))

ROT = math.radians(19.5)
def ring(r,z,n=8):
    return [Vector((r*math.cos(ROT+2*math.pi*i/n),r*math.sin(ROT+2*math.pi*i/n),z)) for i in range(n)]

def shell(b, r0,z0,r1,z1,n=8,cap0=False,cap1=False):
    a=ring(r0,z0,n); c=ring(r1,z1,n)
    for i in range(n):face(b,[a[i],a[(i+1)%n],c[(i+1)%n],c[i]])
    if cap0:face(b,list(reversed(a)))
    if cap1:face(b,c)

def annulus(b, outer,inner,z0,z1):
    a=ring(outer,z0);c=ring(outer,z1);d=ring(inner,z0);e=ring(inner,z1)
    for i in range(8):
        j=(i+1)%8
        for pts in [[a[i],a[j],c[j],c[i]],[d[j],d[i],e[i],e[j]],[c[i],c[j],e[j],e[i]],[a[j],a[i],d[i],d[j]]]:face(b,pts)

def oct_rail(name,r,z,height=1.25):
    b=bucket(name,'trim')
    for zz in [z+.1,z+height]:
        q=ring(r,zz)
        for i in range(8):rod(b,q[i],q[(i+1)%8],.055)
    p=ring(r,z+.1);q=ring(r,z+height)
    for i in range(8):
        j=(i+1)%8;rod(b,p[i],q[i],.06)
        for t in range(1,10):
            f=t/10;rod(b,p[i].lerp(p[j],f),q[i].lerp(q[j],f),.022,6)
        for t in range(5):
            a=t/5;c=(t+1)/5
            rod(b,p[i].lerp(p[j],a),q[i].lerp(q[j],c),.027,6)
            rod(b,q[i].lerp(q[j],a),p[i].lerp(p[j],c),.027,6)

def cabin(name,r,z0,z1,spandrel):
    shell(bucket(name+'_spandrel','trim'),r,z0,r,z0+spandrel)
    shell(bucket(name+'_glazing','glass'),r,z0+spandrel,r,z1)
    b=bucket(name+'_frames','steel')
    for zz in [z0,z0+spandrel,z1]:
        q=ring(r,zz)
        for i in range(8):rod(b,q[i],q[(i+1)%8],.05)
    a=ring(r,z0+spandrel); c=ring(r,z1)
    for i in range(8):
        j=(i+1)%8
        for t in range(5):rod(b,a[i].lerp(a[j],t/4),c[i].lerp(c[j],t/4),.04,6)

# Source-correct lower floor surface 20 m and upper floor surface 51 m.
annulus(bucket('LOWER_FLOOR_Z20','roof','lower_floor'),CFG['lower_gallery_radius'],2.65,19.7,20.0)
oct_rail('Lower gallery lattice railing',CFG['lower_gallery_radius'],20.0)
cabin('Lower glazed ring approximation',6.55*CFG['lower_gallery_radius']/8.15,20.0,20+CFG['lower_glass_height'],.95)
shell(bucket('Lower shallow roof','roof'),6.8*CFG['lower_gallery_radius']/8.15,20+CFG['lower_glass_height'],5.0,20.6+CFG['lower_glass_height'],cap1=True)
annulus(bucket('UPPER_FLOOR_Z51','roof','upper_floor'),CFG['upper_cabin_radius'],2.25,50.7,51.0)
cabin('Upper lantern',CFG['upper_cabin_radius'],51.0,57.0,CFG['upper_spandrel'])
shell(bucket('BODY_ROOF_TOP_Z58_7','roof','body_top'),CFG['upper_cabin_radius']*4.45/4.06,57.0,.32,58.7,cap1=True)
seams=bucket('Upper roof radial seams','steel')
for a,c in zip(ring(CFG['upper_cabin_radius']*4.45/4.06,57.0),ring(.32,58.68)):rod(seams,a,c,.025,6)

# Eight curved/splayed perimeter supports, not four Eiffel legs.
profile=[(0,CFG['foot_radius']),(7,CFG['leg_r7']),(12,CFG['leg_r12']),(20,CFG['leg_r20']),(24,4.9),(32,4.2),(40,3.6),(51,2.75)]
def radius_at(z):
    for (za,ra),(zb,rb) in zip(profile,profile[1:]):
        if za<=z<=zb:return ra+(rb-ra)*(z-za)/(zb-za)
    return profile[-1][1]
for i in range(8):
    ang=ROT+i*math.pi/4
    for (za,ra),(zb,rb) in zip(profile,profile[1:]):
        rod(bucket('Eight structural legs'),(ra*math.cos(ang),ra*math.sin(ang),max(.18,za)),(rb*math.cos(ang),rb*math.sin(ang),zb),.21 if za<20 else .13)
    box(bucket('Eight ground support shoes','concrete'),(CFG['foot_radius']*math.cos(ang),CFG['foot_radius']*math.sin(ang),.1),(.9,0,0),(0,.9,0),.2)

levels=sorted(set([7,20,24,51]+[7+i*CFG['lattice_pitch'] for i in range(int(44/CFG['lattice_pitch'])+1)]))
cross=bucket('Eight-sided diagonal lattice')
for z0,z1 in zip(levels,levels[1:]):
    a=ring(radius_at(z0),z0); c=ring(radius_at(z1),z1)
    for i in range(8):
        j=(i+1)%8;rod(cross,a[i],c[j],CFG['lattice_rod_radius']);rod(cross,a[j],c[i],CFG['lattice_rod_radius'])
for z in levels:
    q=ring(radius_at(z),z)
    for i in range(8):rod(bucket('Horizontal structural hoops'),q[i],q[(i+1)%8],.07)

shell(bucket('Octagonal central core','steel'),1.05,0,1.05,51,cap1=True)
# Two true geometric spiral flights; pitch/details are estimates, not a source claim.
for flight in range(2):
    steps=bucket('Spiral stair treads '+str(flight),'wood')
    rail=bucket('Spiral handrail '+str(flight),'trim')
    last=None
    for i in range(300):
        z=51*i/299;phi=2*math.pi*z/3.8+flight*math.pi
        radial=Vector((math.cos(phi),math.sin(phi),0)); tangent=Vector((-math.sin(phi),math.cos(phi),0))
        if i<299:box(steps,2.15*radial+Vector((0,0,z)),radial*.8,tangent*.34,.065)
        p=2.58*radial+Vector((0,0,z+.95))
        if last is not None:rod(rail,last,p,.027,6)
        if i%4==0:rod(rail,p,p-Vector((0,0,.95)),.022,6)
        last=p

# Hall envelope, real recesses, windows and southern doorway in all directions.
hallr=(CFG['hall_flat_width']/2)/math.cos(math.pi/8); corners=ring(hallr,0)
for i in range(8):
    A=corners[i];B=corners[(i+1)%8];u=(B-A).normalized();mid=(A+B)/2;n=Vector((mid.x,mid.y,0)).normalized();width=(B-A).length
    south=n.y<-.95;opening=2.5 if south else 1.75;bottom=0 if south else 1.1;top=4.0
    b=bucket('Cream hall walls with physical openings','cream')
    def wallpiece(u0,u1,z0,z1):
        if u1>u0 and z1>z0:box(b,mid+u*((u0+u1)/2)-n*.13+Vector((0,0,(z0+z1)/2)),u*(u1-u0),n*.26,z1-z0)
    wallpiece(-width/2,-opening/2,0,5.4);wallpiece(opening/2,width/2,0,5.4);wallpiece(-opening/2,opening/2,0,bottom);wallpiece(-opening/2,opening/2,top,5.4)
    for off in [-opening/2,opening/2]:box(bucket('Physical window and doorway trim','trim'),mid+u*off+n*.03+Vector((0,0,(bottom+top)/2)),u*.15,n*.3,top-bottom+.16)
    for zz in [bottom,top]:box(bucket('Physical window and doorway trim','trim'),mid+n*.03+Vector((0,0,zz)),u*(opening+.18),n*.3,.15)
    box(bucket('Deep window and doorway recesses','dark'),mid-n*.29+Vector((0,0,(bottom+top)/2)),u*opening,n*.05,top-bottom)
    box(bucket('Recessed window glass','glass'),mid-n*.13+Vector((0,0,(bottom+top)/2)),u*(opening-.1),n*.03,top-bottom-.1)
    for f in [-.25,0,.25]:box(bucket('Window mullions','trim'),mid+u*(opening*f)-n*.09+Vector((0,0,(bottom+top)/2)),u*.035,n*.05,top-bottom)
    if south:
        for side in [-1,1]:
            box(bucket('Blank southern information boards','red'),mid+u*(side*3.05)+n*.03+Vector((0,0,2.45)),u*1.15,n*.08,2.2)
            p=mid+u*(side*1.8)+n*.45+Vector((0,0,3.55))
            rod(bucket('Southern green lanterns','green'),p-Vector((0,0,.3)),p+Vector((0,0,.3)),.18,8)
            rod(bucket('Lantern brackets','green'),p,p-n*.6,.045)
shell(bucket('Hall shallow octagonal roof','roof'),hallr+.5,5.4,.5,7.0,cap1=True)
for a,c in zip(ring(hallr+.5,5.4),ring(.5,7.0)):rod(bucket('Hall roof standing seams','steel'),a,c,.025,6)

# Decorative curved braces are real three-dimensional members.
for i in range(8):
    a=ring(min(CFG['foot_radius']-.4,hallr+.3),.6)[i];c=ring(min(CFG['foot_radius']-.4,hallr+.3),.6)[(i+1)%8];last=None
    for k in range(25):
        t=k/24;p=a.lerp(c,t)+Vector((0,0,6.7*math.sin(math.pi*t)))
        if last is not None:rod(bucket('Hall decorative arches'),last,p,.085)
        last=p

# Additional physical hall cornices, columns and entrance detailing, still estimated.
for i in range(8):
    A=corners[i];B=corners[(i+1)%8];u=(B-A).normalized();mid=(A+B)/2;n=Vector((mid.x,mid.y,0)).normalized();width=(B-A).length
    for zz in [.55,4.55,5.20]:
        box(bucket('Hall horizontal facade mouldings','trim'),mid+n*.08+Vector((0,0,zz)),u*(width-.1),n*.18,.12)
    for side in [-1,1]:
        center=mid+u*(side*(width/2-.2))+n*.08+Vector((0,0,2.7))
        box(bucket('Hall corner pilasters','cream'),center,u*.26,n*.2,5.4)
    # Curved raised window/door frame, plus real pane subdivisions.
    opening=2.5 if n.y<-.95 else 1.75
    last=None
    for k in range(21):
        t=math.pi*k/20
        q=mid+n*.12+u*(opening*.51*math.cos(t))+Vector((0,0,4.0+.5*math.sin(t)))
        if last is not None:rod(bucket('Raised curved opening caps','trim'),last,q,.065,6)
        last=q
    if n.y<-.95:
        box(bucket('Double entry doors physical center stile','trim'),mid+n*.06+Vector((0,0,2)),u*.11,n*.18,4)
        for side in [-1,1]:
            rod(bucket('Door handles','steel'),mid+u*(side*.15)+n*.16+Vector((0,0,1.7)),mid+u*(side*.15)+n*.16+Vector((0,0,2.0)),.025,6)
            box(bucket('Entry threshold','concrete'),mid+n*.25+Vector((0,0,.04)),u*2.7,n*.7,.08)
    # Arched roof-to-leg brackets rather than a flat context disc.
    a=ring(radius_at(7),7)[i];b=ring(radius_at(7),7)[(i+1)%8]
    last=None
    for k in range(25):
        t=k/24;q=a.lerp(b,t)+Vector((0,0,3.3*math.sin(math.pi*t)))
        if last is not None:rod(bucket('Roof-level arched leg joints','steel'),last,q,.11)
        last=q
    if CFG['facade_detail_level']>=2:
        for j in range(7):
            x=-width*.4+width*.8*j/6
            c=mid+u*x+n*.15+Vector((0,0,5.0))
            rod(bucket('Cornice vertical dentils','trim'),c-Vector((0,0,.12)),c+Vector((0,0,.12)),.055,6)

# Antenna is separate from binding 58.7 m body-height measurement.
mast=bucket('Estimated antenna mast','trim','mast')
sq=[Vector((.58*math.cos(ROT+math.pi/4+i*math.pi/2),.58*math.sin(ROT+math.pi/4+i*math.pi/2),0)) for i in range(4)]
for i in range(4):rod(mast,sq[i]+Vector((0,0,58.7)),sq[i]+Vector((0,0,(MAST_TOP-.3))),.045,6)
for k in range(8):
    z0=58.7+(MAST_TOP-59.0)*k/8;z1=min(MAST_TOP-.3,z0+(MAST_TOP-59.0)/8)
    for i in range(4):
        j=(i+1)%4;rod(mast,sq[i]+Vector((0,0,z0)),sq[j]+Vector((0,0,z1)),.025,6);rod(mast,sq[j]+Vector((0,0,z0)),sq[i]+Vector((0,0,z1)),.025,6)
for z in [60.2,62,64,min(66,MAST_TOP-1.0),MAST_TOP-.7]:
    rod(mast,(.5,0,z),(1.5,0,z),.035,6);rod(mast,(1.5,0,z-.35),(1.5,0,z+.35),.025,6)
rod(mast,(0,0,MAST_TOP-.6),(0,0,MAST_TOP),.035,8)

tower=[]
for name,b in buckets.items():
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(b['v'],[],b['f']);mesh.update();ob=bpy.data.objects.new(name,mesh);scene.collection.objects.link(ob);ob.data.materials.append(M[b['mat']]);ob['source_role']=b['role'];ob['all_geometry_created_for']='Petřín M05';tower.append(ob)

# Neutral three-dimensional context; never a target photograph backdrop.
context=[]
def context_mesh(name,points,mat):
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(points,[],[tuple(range(len(points)))]);mesh.update();ob=bpy.data.objects.new(name,mesh);scene.collection.objects.link(ob);ob.data.materials.append(M[mat]);context.append(ob)
context_mesh('Neutral park ground',[(-350,-350,-.05),(350,-350,-.05),(350,350,-.05),(-350,350,-.05)],'grass')
world=bpy.data.worlds.new('Procedural daylight');world.use_nodes=True;scene.world=world;nodes=world.node_tree.nodes;sky=nodes.new('ShaderNodeTexSky');sky.sky_type='MULTIPLE_SCATTERING';sky.sun_elevation=math.radians(45);sky.sun_rotation=math.radians(120);world.node_tree.links.new(sky.outputs['Color'],nodes.get('Background').inputs['Color']);nodes.get('Background').inputs['Strength'].default_value=.35
light=bpy.data.lights.new('Soft daylight sun','SUN');light.energy=2.3;light.angle=math.radians(12);sun=bpy.data.objects.new('Soft daylight sun',light);scene.collection.objects.link(sun);sun.rotation_euler=(math.radians(25),math.radians(-25),math.radians(-35))

cameras={};projection_checks=[]
for view in ['K1','K2','K3','K4','K5']:
    c=json.loads((ROOT/f'inputs/cameras/{view}.json').read_text());w,h=c['canvas'];scene.render.resolution_x=w;scene.render.resolution_y=h
    data=bpy.data.cameras.new(view);ob=bpy.data.objects.new(view,data);scene.collection.objects.link(ob);scene.camera=ob
    data.type='PERSP';data.sensor_fit='VERTICAL';data.sensor_height=24;data.sensor_width=36;data.lens=24/(2*math.tan(math.radians(c['verticalFOVDegrees'])/2));data.clip_start=.1;data.clip_end=1500
    ob.location=c['positionRelativeTowerCenterM'];az=math.radians(c['cameraAzimuthDegrees']);p=math.radians(c['pitchDegrees']);direction=Vector((-math.sin(az)*math.cos(p),-math.cos(az)*math.cos(p),math.sin(p)));ob.rotation_euler=direction.to_track_quat('-Z','Y').to_euler();bpy.context.view_layer.update()
    # Shift is calibrated only to the already supplied principal point, never to an image/mask overlap objective.
    test=Vector((0,0,30));x0=world_to_camera_view(scene,ob,test).x;data.shift_x=.0001;x1=world_to_camera_view(scene,ob,test).x;data.shift_x=(c['principalPointNativePx'][0]/w-.5)/( (x1-x0)/.0001 );bpy.context.view_layer.update()
    # Preserve fitted principal point in both axes. No target image or mask is deformed.
    y0=world_to_camera_view(scene,ob,test).y;data.shift_y=.0001;y1=world_to_camera_view(scene,ob,test).y
    data.shift_y=(.5-c['principalPointNativePx'][1]/h)/((y1-y0)/.0001);bpy.context.view_layer.update()
    checks=[]
    for key,row in c['modelPhysicalLevelAxisProjection'].items():
        pos=world_to_camera_view(scene,ob,Vector((0,0,row['heightM'])));yp=(1-pos.y)*h;checks.append({'level':key,'expectedNativeY':row['nativeY'],'blenderNativeY':yp,'errorPixels':yp-row['nativeY']})
    maxerr=max(abs(x['errorPixels']) for x in checks)
    assert maxerr<.1,(view,maxerr,checks)
    projection_checks.append({'view':view,'maximumAxisProjectionErrorPixels':maxerr,'levels':checks,'principalPointCalibrationOnly':True,'noImageBasedCameraOptimization':False});cameras[view]=(ob,c)

measurements={}
for role in ['body','body_top','lower_floor','upper_floor','mast']:
    zs=[(ob.matrix_world@v.co).z for ob in tower if ob['source_role']==role for v in ob.data.vertices]
    measurements[role]={'minZ':min(zs),'maxZ':max(zs),'vertices':len(zs)}
body_top=measurements['body_top']['maxZ'];lower=measurements['lower_floor']['maxZ'];upper=measurements['upper_floor']['maxZ']
assert abs(body_top-58.7)<1e-4 and abs(lower-20)<1e-5 and abs(upper-51)<1e-5
manifest={'round':'M05','maximumTotalModelRounds':10,'blender':bpy.app.version_string,'renderDevice':device,'meshObjects':len(tower),'meshVertices':sum(len(x.data.vertices) for x in tower),'meshPolygons':sum(len(x.data.polygons) for x in tower),'sourceBindingHeightsM':{'body':58.7,'lowerFloor':20,'upperFloor':51},'actualMeshMeasurements':measurements,'heightSourceConformanceErrorsPercent':{'body':abs(body_top-58.7)/58.7*100,'lowerFloor':abs(lower-20)/20*100,'upperFloor':abs(upper-51)/51*100},'heightConformanceIsNotPhotoAccuracy':True,'hallDimensionsAndWidthsAreSourceEstimates':True,'stairPitchAndDetailGeometryApproximate':True,'rearHallDetailUnverified':True,'targetPhotosUsedAsTextures':False,'geometryIndependentOfImagePlatformErrors':True,'cameraProjectionChecks':projection_checks,'noGameIntegration':True,'noR2':True,'noPublication':True,'createdSecondsAfterStart':time.time()-START}
(ROOT/'geometry-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'petrin-M05.blend'),compress=True)
print('MODEL_SAVED',len(tower),manifest['meshPolygons'],flush=True)

white=bpy.data.materials.new('Mask override emission');white.use_nodes=True;ns=white.node_tree.nodes;ns.clear();em=ns.new('ShaderNodeEmission');em.inputs['Color'].default_value=(1,1,1,1);em.inputs['Strength'].default_value=1;op=ns.new('ShaderNodeOutputMaterial');white.node_tree.links.new(em.outputs['Emission'],op.inputs['Surface'])
for view,(ob,c) in cameras.items():
    scene.camera=ob;scene.render.resolution_x=c['canvas'][0];scene.render.resolution_y=c['canvas'][1];scene.render.film_transparent=False;scene.cycles.samples=48;scene.cycles.use_denoising=True;scene.view_layers[0].material_override=None
    for x in context:x.hide_render=False
    scene.render.filepath=str(ROOT/f'renders/{view}-model.png');print('RENDER_BEAUTY',view,flush=True);bpy.ops.render.render(write_still=True)
    for x in context:x.hide_render=True
    scene.render.film_transparent=True;scene.cycles.samples=1;scene.cycles.use_denoising=False;scene.view_layers[0].material_override=white;scene.render.filepath=str(ROOT/f'renders/{view}-geometry-alpha.png');print('RENDER_MASK',view,flush=True);bpy.ops.render.render(write_still=True)
    (ROOT/'render-progress.json').write_text(json.dumps({'round':'M05','lastCompletedView':view,'secondsElapsed':time.time()-START},indent=2)+'\n')
scene.view_layers[0].material_override=None;scene.render.film_transparent=False;scene.cycles.samples=48;scene.cycles.use_denoising=True
for x in context:x.hide_render=False
scene.camera=cameras['K1'][0];scene.render.resolution_x=1536;scene.render.resolution_y=1024
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'petrin-M05.blend'),compress=True)
(ROOT/'render-complete.json').write_text(json.dumps({'round':'M05','views':['K1','K2','K3','K4','K5'],'modelIterationsCompleted':1,'secondsElapsed':time.time()-START,'renderDevice':device},indent=2)+'\n')
print('M05_COMPLETE',time.time()-START,flush=True)
