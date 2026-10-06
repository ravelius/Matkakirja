// NATIIVI MAC -SYÖTE (Natiiviseppä 6.10.2026; omistaja: natiivi Mac-appi). Sama C-rajapinta kuin iPad-sovelluksen
// Plugins/iOS/MatkakirjaMacSyote.mm, jotta UI/MacSyote.cs (Natiivi-UI) toimii natiivissa Mac-sovelluksessa sellaisenaan:
//   MatkakirjaMacSyote_Asenna(pakota) → 1, kun tarkkailijat ovat käytössä
//   MatkakirjaMacSyote_Lue(float[8])  → [vetoX, vetoY, rullaX, rullaY, nipistys, osoitinX, osoitinY, tapahtumia]
//   MatkakirjaMacSyote_Ikkuna(minL, minK) → ikkunan minimikoko pisteinä ja vihreä nappi macOS:n kokonäytöksi (vain natiivi Mac)
// (pikseleinä, origo vasen yläkulma; nipistys kertoimena, 1 = ei muutosta) ja nollaus.
// Lähteet ovat NSEventin paikallisia tarkkailijoita (sovelluksen omat tapahtumat; tapahtuma kulkee edelleen Unitylle):
//   - ohjauslevyn kahden sormen veto: scrollWheel, hasPreciseScrollingDeltas → veto
//   - hiiren rulla: scrollWheel ilman tarkkoja deltoja → rulla (rivit × RIVI pistettä, kuten UIKitin askeleinen vieritys)
//   - ohjauslevyn nipistys: magnify → nipistys *= 1 + magnification
// Käännös: tyokalut/mac-plugarit/kaanna.sh → Assets/Plugins/macOS/MatkakirjaMacSyote.bundle (arm64).
#import <AppKit/AppKit.h>

static float mkVetoX, mkVetoY, mkRullaX, mkRullaY, mkNipistys = 1.0f, mkOsX = -1.0f, mkOsY = -1.0f;
static int mkTapahtumia;
static id mkTarkkailija;
static const CGFloat RIVI = 10.0;

static void mkOsoitin(NSEvent* e)
{
    NSWindow* w = e.window ?: [NSApp keyWindow];
    if (w == nil) return;
    NSView* v = w.contentView;
    NSPoint p = [v convertPoint: e.locationInWindow fromView: nil];
    CGFloat s = w.backingScaleFactor;
    mkOsX = (float)(p.x * s);
    mkOsY = (float)((v.bounds.size.height - p.y) * s);
    mkTapahtumia++;
}

extern "C" int MatkakirjaMacSyote_Asenna(int pakota)
{
    (void)pakota;
    if (mkTarkkailija != nil) return 1;
    mkTarkkailija = [NSEvent addLocalMonitorForEventsMatchingMask: (NSEventMaskScrollWheel | NSEventMaskMagnify)
                                                           handler: ^NSEvent* (NSEvent* e)
    {
        CGFloat s = (e.window ?: [NSApp keyWindow]).backingScaleFactor;
        if (s <= 0) s = 1;
        if (e.type == NSEventTypeMagnify)
        {
            if (e.magnification > -1.0) mkNipistys *= (float)(1.0 + e.magnification);
        }
        else if (e.hasPreciseScrollingDeltas)
        {
            mkVetoX += (float)(e.scrollingDeltaX * s);
            mkVetoY += (float)(e.scrollingDeltaY * s);
        }
        else
        {
            mkRullaX += (float)(e.scrollingDeltaX * RIVI * s);
            mkRullaY += (float)(e.scrollingDeltaY * RIVI * s);
        }
        mkOsoitin(e);
        return e;
    }];
    return mkTarkkailija != nil ? 1 : 0;
}

extern "C" void MatkakirjaMacSyote_Lue(float* ulos)
{
    ulos[0] = mkVetoX; ulos[1] = mkVetoY; ulos[2] = mkRullaX; ulos[3] = mkRullaY;
    ulos[4] = mkNipistys; ulos[5] = mkOsX; ulos[6] = mkOsY; ulos[7] = (float)mkTapahtumia;
    mkVetoX = mkVetoY = mkRullaX = mkRullaY = 0.0f;
    mkNipistys = 1.0f;
}

// Näytön pistetiheys (Natiivi-UI:n UiKerros.PikseliaPisteessa Macilla): avainikkunan tai päänäytön backingScaleFactor
// (Retina 2, muuten 1). Screen.dpi ei kerro Macin pistettä luotettavasti.
extern "C" float MatkakirjaMacSyote_Skaala(void)
{
    NSWindow* w = [NSApp keyWindow] ?: [NSApp mainWindow];
    CGFloat s = w != nil ? w.backingScaleFactor : [NSScreen mainScreen].backingScaleFactor;
    return s > 0 ? (float)s : 1.0f;
}

// Ikkuna (Natiivi-UI:n Mac v1 -löydökset 7.10.2026): pienin sisältökoko pisteinä suoraan AppKitille. Screen.SetResolution
// ei kelpaa: Unity tallentaa koon näyttöasetuksiinsa, ja kokonäyttö käytti sitä (2048 × 1400 → näytön tila vaihtui 2560 ×
// 1440 eikä palautunut). Vihreä nappi = macOS:n oma kokonäyttö (FullScreenPrimary). Palauttaa käsiteltyjen ikkunoiden määrän.
extern "C" int MatkakirjaMacSyote_Ikkuna(float minLeveys, float minKorkeus)
{
    int n = 0;
    NSSize minimi = NSMakeSize(minLeveys, minKorkeus);
    for (NSWindow* w in [NSApp windows])
    {
        if (!w.isVisible || (w.styleMask & NSWindowStyleMaskResizable) == 0) continue;
        if (!NSEqualSizes(w.contentMinSize, minimi)) w.contentMinSize = minimi;
        w.collectionBehavior = (w.collectionBehavior | NSWindowCollectionBehaviorFullScreenPrimary)
            & ~NSWindowCollectionBehaviorFullScreenAuxiliary;
        if ((w.styleMask & NSWindowStyleMaskFullScreen) == 0)
        {
            NSSize koko = [w contentRectForFrameRect:w.frame].size;
            if (koko.width < minLeveys || koko.height < minKorkeus)
                [w setContentSize:NSMakeSize(MAX(koko.width, minLeveys), MAX(koko.height, minKorkeus))];
        }
        n++;
    }
    return n;
}
