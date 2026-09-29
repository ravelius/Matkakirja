// Tähtitaivaan asento (Linssiseppä 29.9.2026, Päätoimittajan tilaus: oikea pohjoinen ilman sijaintilupaa). CoreMotionin
// laiteliike magneettisen pohjoisen kehyksessä (CMAttitudeReferenceFrameXMagneticNorthZVertical: X magneettinen pohjoinen,
// Z ylös): magnetometri ja gyro yhdessä, ei vaadi sijaintilupaa eikä Info.plist-avainta. Deklinaatio (todellinen pohjoinen)
// lasketaan C#:ssa kartalla katsotusta paikasta (Linssit/Ydin/Taivas/Wmm.cs). Linssit/Unity/TaivasNayttamo.cs lukee nämä.
#import <CoreMotion/CoreMotion.h>   // kehys linkitetään .metan FrameworkDependencies: CoreMotion -asetuksella

static CMMotionManager *mkTaivasLiike = nil;

// true = päivitykset alkoivat (laitteessa on magnetometri ja magneettinen kehys).
extern "C" bool MatkakirjaTaivas_Aloita(void)
{
    if (mkTaivasLiike == nil) mkTaivasLiike = [[CMMotionManager alloc] init];
    if (!mkTaivasLiike.deviceMotionAvailable) return false;
    if (([CMMotionManager availableAttitudeReferenceFrames] & CMAttitudeReferenceFrameXMagneticNorthZVertical) == 0) return false;
    mkTaivasLiike.deviceMotionUpdateInterval = 1.0 / 60.0;
    mkTaivasLiike.showsDeviceMovementDisplay = NO;
    [mkTaivasLiike startDeviceMotionUpdatesUsingReferenceFrame:CMAttitudeReferenceFrameXMagneticNorthZVertical];
    return true;
}

extern "C" void MatkakirjaTaivas_Lopeta(void)
{
    if (mkTaivasLiike != nil) [mkTaivasLiike stopDeviceMotionUpdates];
}

// Asento kvaterniona (x, y, z, w) laitteen kehyksestä viitekehykseen; false = ei vielä näytettä.
extern "C" bool MatkakirjaTaivas_Asento(float *q)
{
    CMDeviceMotion *m = mkTaivasLiike != nil ? mkTaivasLiike.deviceMotion : nil;
    if (m == nil || q == NULL) return false;
    CMQuaternion c = m.attitude.quaternion;
    q[0] = (float)c.x; q[1] = (float)c.y; q[2] = (float)c.z; q[3] = (float)c.w;
    return true;
}

// Magnetometrin kalibrointi: -1 kalibroimaton, 0 matala, 1 keskitaso, 2 korkea (CMMagneticFieldCalibrationAccuracy); -2 ei dataa.
extern "C" int MatkakirjaTaivas_Tarkkuus(void)
{
    CMDeviceMotion *m = mkTaivasLiike != nil ? mkTaivasLiike.deviceMotion : nil;
    return m != nil ? (int)m.magneticField.accuracy : -2;
}
