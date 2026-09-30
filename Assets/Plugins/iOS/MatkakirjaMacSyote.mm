// MAC-SYÖTE (Natiivi-UI 30.9.2026; omistaja: "saako macin ipad appiin kahden sormen panoroinnin karttaan ja teksteihin sekä
// kahden sormen pinch zoomauksen karttaan?"). iPad-sovellus Macilla (Designed for iPad, NSProcessInfo.isiOSAppOnMac):
// Unityn trampoliini välittää hiiren rullan (GCMouse → UnitySendScrollWheel) ja osoittimen paikan, mutta ei ohjauslevyn
// nipistystä eikä erottele ohjauslevyn vetoa hiiren rullasta. Tämä liittää UnityViewiin kolme tunnistinta:
//   - jatkuva vieritys (ohjauslevyn kahden sormen veto): UIPanGestureRecognizer, allowedScrollTypesMask = continuous
//   - askeleinen vieritys (hiiren rulla): UIPanGestureRecognizer, allowedScrollTypesMask = discrete
//   - nipistys (ohjauslevy): UIPinchGestureRecognizer, allowedTouchTypes = IndirectPointer
// Vetotunnistimilla maximumNumberOfTouches = 0 ja nipistyksellä vain epäsuora osoitin, joten kosketukset (myös hiiren
// painallukset Macilla) kulkevat Unitylle kuten ennen. Deltat kertyvät ja UI/MacSyote.cs lukee ne kerran ruudussa.
#import <UIKit/UIKit.h>

extern UIView* UnityGetGLView(void);

static float mkVetoX, mkVetoY, mkRullaX, mkRullaY, mkNipistys = 1.0f, mkOsX = -1.0f, mkOsY = -1.0f;
static int mkTapahtumia;

@interface MKMacSyote : NSObject <UIGestureRecognizerDelegate>
@end

@implementation MKMacSyote

- (void)osoitin:(UIGestureRecognizer*)g
{
    CGPoint p = [g locationInView: g.view];
    CGFloat s = g.view.contentScaleFactor;
    mkOsX = (float)(p.x * s);
    mkOsY = (float)(p.y * s);
    mkTapahtumia++;
}

- (void)jatkuva:(UIPanGestureRecognizer*)g
{
    CGPoint t = [g translationInView: g.view];
    CGFloat s = g.view.contentScaleFactor;
    mkVetoX += (float)(t.x * s);
    mkVetoY += (float)(t.y * s);
    [g setTranslation: CGPointZero inView: g.view];
    [self osoitin: g];
}

- (void)rulla:(UIPanGestureRecognizer*)g
{
    CGPoint t = [g translationInView: g.view];
    CGFloat s = g.view.contentScaleFactor;
    mkRullaX += (float)(t.x * s);
    mkRullaY += (float)(t.y * s);
    [g setTranslation: CGPointZero inView: g.view];
    [self osoitin: g];
}

- (void)nipistys:(UIPinchGestureRecognizer*)g
{
    if (g.scale > 0.0) mkNipistys *= (float)g.scale;
    g.scale = 1.0;
    [self osoitin: g];
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer*)a shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer*)b
{
    return YES;
}

@end

static MKMacSyote* mkSyote;

// Asentaa tunnistimet, jos sovellus ajetaan Macilla (tai pakota = testi). Palauttaa 1, jos tunnistimet ovat käytössä.
extern "C" int MatkakirjaMacSyote_Asenna(int pakota)
{
    if (mkSyote != nil) return 1;
    BOOL mac = NO;
    if (@available(iOS 14.0, *)) mac = [NSProcessInfo processInfo].isiOSAppOnMac;
    if (!mac && !pakota) return 0;
    UIView* v = UnityGetGLView();
    if (v == nil) return 0;
    mkSyote = [[MKMacSyote alloc] init];
    if (@available(iOS 13.4, *))
    {
        UIPanGestureRecognizer* jatkuva = [[UIPanGestureRecognizer alloc] initWithTarget: mkSyote action: @selector(jatkuva:)];
        jatkuva.allowedScrollTypesMask = UIScrollTypeMaskContinuous;
        jatkuva.maximumNumberOfTouches = 0;
        jatkuva.cancelsTouchesInView = NO;
        jatkuva.delaysTouchesBegan = NO;
        jatkuva.delaysTouchesEnded = NO;
        jatkuva.delegate = mkSyote;
        [v addGestureRecognizer: jatkuva];

        UIPanGestureRecognizer* rulla = [[UIPanGestureRecognizer alloc] initWithTarget: mkSyote action: @selector(rulla:)];
        rulla.allowedScrollTypesMask = UIScrollTypeMaskDiscrete;
        rulla.maximumNumberOfTouches = 0;
        rulla.cancelsTouchesInView = NO;
        rulla.delaysTouchesBegan = NO;
        rulla.delaysTouchesEnded = NO;
        rulla.delegate = mkSyote;
        [v addGestureRecognizer: rulla];

        UIPinchGestureRecognizer* nipistys = [[UIPinchGestureRecognizer alloc] initWithTarget: mkSyote action: @selector(nipistys:)];
        nipistys.allowedTouchTypes = @[ @(UITouchTypeIndirectPointer) ];
        nipistys.cancelsTouchesInView = NO;
        nipistys.delaysTouchesBegan = NO;
        nipistys.delaysTouchesEnded = NO;
        nipistys.delegate = mkSyote;
        [v addGestureRecognizer: nipistys];
    }
    return 1;
}

// Kertyneet arvot ja nollaus: [vetoX, vetoY, rullaX, rullaY, nipistys, osoitinX, osoitinY, tapahtumia] (pikseleinä,
// origo vasen yläkulma; nipistys kertoimena, 1 = ei muutosta).
extern "C" void MatkakirjaMacSyote_Lue(float* ulos)
{
    ulos[0] = mkVetoX; ulos[1] = mkVetoY; ulos[2] = mkRullaX; ulos[3] = mkRullaY;
    ulos[4] = mkNipistys; ulos[5] = mkOsX; ulos[6] = mkOsY; ulos[7] = (float)mkTapahtumia;
    mkVetoX = mkVetoY = mkRullaX = mkRullaY = 0.0f;
    mkNipistys = 1.0f;
}
