// simkosketus: oikeat sormikosketukset iOS-simulaattoriin komentoriviltä (Pelikoodari 5.10.2026).
// Sama reitti kuin Simulator.appin hiirellä ja idb:llä: SimulatorKitin IndigoHID-viesti → SimDeviceLegacyHIDClient,
// eli kosketus kulkee iOS:n oikean syötepolun läpi (UITK:n osumatestaus, ohinapautus, eleet), ei pelin `ui napauta`.
// Ei tarvitse Simulator.appia eikä näytön lupaa.
//
//   simkosketus <UDID> koko                          → "leveys korkeus" pisteinä
//   simkosketus <UDID> tap <x> <y> [kesto_s]          napautus (kesto > 0,5 = pitkä painallus)
//   simkosketus <UDID> veto <x1> <y1> <x2> <y2> [kesto_s]
//   simkosketus <UDID> polku x,y[,dt_ms] x,y[,dt_ms] …  ensimmäinen = alas, viimeinen = ylös
// Koordinaatit pisteinä (sama kuin `ui puu` / simulaattorin control-työkalu), origo vasen yläkulma, pystyasento.
//
// Käännös: clang -fobjc-arc -framework Foundation -o simkosketus simkosketus.m
#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <dlfcn.h>
#import <objc/message.h>

typedef void *(*MouseFn)(CGPoint *p0, CGPoint *p1, uint32_t target, uint64_t eventType, uint64_t reuna, CGFloat w, CGFloat h);
static MouseFn mouse;
static id asiakas;
static CGSize koko;
static dispatch_queue_t jono;

enum { ALAS = 1, YLOS = 2, VETO = 6 };   // NSEventTypeLeftMouseDown/Up/Dragged
static const uint32_t KOHDE_NAYTTO = 0x32;

static BOOL laheta(CGPoint p, uint64_t tyyppi) {
  void *viesti = mouse(&p, NULL, KOHDE_NAYTTO, tyyppi, 0, koko.width, koko.height);
  if (!viesti) return NO;   // SimulatorKit pudottaa alle 16 ms välein tulevat vedot
  dispatch_semaphore_t s = dispatch_semaphore_create(0);
  __block NSError *virhe = nil;
  void (^valmis)(NSError *) = ^(NSError *e) { virhe = e; dispatch_semaphore_signal(s); };
  ((void (*)(id, SEL, void *, BOOL, id, id))objc_msgSend)(asiakas, NSSelectorFromString(@"sendWithMessage:freeWhenDone:completionQueue:completion:"),
                                                          viesti, YES, jono, valmis);
  if (dispatch_semaphore_wait(s, dispatch_time(DISPATCH_TIME_NOW, 3 * NSEC_PER_SEC)) != 0) { fprintf(stderr, "aikaraja\n"); return NO; }
  if (virhe) { fprintf(stderr, "virhe: %s\n", virhe.localizedDescription.UTF8String); return NO; }
  return YES;
}

static void nuku(double s) { if (s > 0) usleep((useconds_t)(s * 1e6)); }

// Liike p1 → p2 vetoina ~60 Hz:llä (ei alas/ylös).
static void liiku(CGPoint a, CGPoint b, double kesto) {
  int n = MAX(1, (int)(kesto / 0.02));
  for (int i = 1; i <= n; i++) {
    double t = (double)i / n;
    laheta(CGPointMake(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t), VETO);
    nuku(kesto / n);
  }
}

static int kaytto(void) {
  fprintf(stderr, "käyttö: simkosketus <UDID> koko | tap x y [kesto] | veto x1 y1 x2 y2 [kesto] | polku x,y[,dt_ms] …\n");
  return 2;
}

int main(int argc, char **argv) {
  @autoreleasepool {
    if (argc < 3) return kaytto();
    NSString *kehitys = @"/Applications/Xcode.app/Contents/Developer";
    FILE *xs = popen("/usr/bin/xcode-select -p", "r");
    char pol[1024];
    if (xs && fgets(pol, sizeof pol, xs)) kehitys = [[NSString stringWithUTF8String:pol] stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceAndNewlineCharacterSet];
    if (xs) pclose(xs);
    NSString *jaetut = [[kehitys stringByDeletingLastPathComponent] stringByAppendingPathComponent:@"SharedFrameworks/SimulatorKit.framework/SimulatorKit"];
    if (!dlopen("/Library/Developer/PrivateFrameworks/CoreSimulator.framework/CoreSimulator", RTLD_NOW) || !dlopen(jaetut.UTF8String, RTLD_NOW)) {
      fprintf(stderr, "CoreSimulator/SimulatorKit ei latautunut: %s\n", dlerror()); return 3;
    }
    mouse = (MouseFn)dlsym(RTLD_DEFAULT, "IndigoHIDMessageForMouseNSEvent");
    if (!mouse) { fprintf(stderr, "IndigoHIDMessageForMouseNSEvent puuttuu\n"); return 3; }

    NSError *virhe = nil;
    id konteksti = ((id (*)(id, SEL, id, NSError **))objc_msgSend)(NSClassFromString(@"SimServiceContext"),
        NSSelectorFromString(@"sharedServiceContextForDeveloperDir:error:"), kehitys, &virhe);
    // T7-LAITESARJA (omistaja 7.10.2026; Natiiviseppä 8.10.): simulaattorit ovat vain T7-sarjassa (simusarja.sh, MK_SIMSET).
    // Sarja puuttuu → virhe, EI paluuta sisäiseen oletussarjaan.
    const char *ymp = getenv("MK_SIMSET");
    NSString *sarja = ymp && *ymp ? [NSString stringWithUTF8String:ymp] : @"/Volumes/T7 4TB/Simulaattorit/Sarja";
    if (![NSFileManager.defaultManager fileExistsAtPath:sarja]) { fprintf(stderr, "T7-laitesarjaa ei löydy: %s (liitä T7)\n", sarja.UTF8String); return 3; }
    id joukko = ((id (*)(id, SEL, id, NSError **))objc_msgSend)(konteksti, NSSelectorFromString(@"deviceSetWithPath:error:"), sarja, &virhe);
    if (!joukko) { fprintf(stderr, "T7-laitesarja ei auennut: %s\n", virhe.localizedDescription.UTF8String); return 3; }
    NSDictionary *laitteet = ((id (*)(id, SEL))objc_msgSend)(joukko, NSSelectorFromString(@"devicesByUDID"));
    NSString *haku = [NSString stringWithUTF8String:argv[1]].uppercaseString;
    id laite = nil;
    for (NSUUID *u in laitteet) if ([u.UUIDString hasPrefix:haku]) { laite = laitteet[u]; break; }
    if (!laite) { fprintf(stderr, "laitetta %s ei löydy\n", argv[1]); return 3; }
    if (((long (*)(id, SEL))objc_msgSend)(laite, NSSelectorFromString(@"state")) != 3) { fprintf(stderr, "laite ei ole käynnissä\n"); return 3; }

    id tyyppi = ((id (*)(id, SEL))objc_msgSend)(laite, NSSelectorFromString(@"deviceType"));
    CGSize px = ((CGSize (*)(id, SEL))objc_msgSend)(tyyppi, NSSelectorFromString(@"mainScreenSize"));
    float skaala = ((float (*)(id, SEL))objc_msgSend)(tyyppi, NSSelectorFromString(@"mainScreenScale"));
    koko = CGSizeMake(px.width / skaala, px.height / skaala);
    NSString *komento = [NSString stringWithUTF8String:argv[2]];
    if ([komento isEqualToString:@"koko"]) { printf("%g %g\n", koko.width, koko.height); return 0; }

    Class luokka = NSClassFromString(@"_TtC12SimulatorKit24SimDeviceLegacyHIDClient");
    asiakas = ((id (*)(id, SEL, id, NSError **))objc_msgSend)([luokka alloc], NSSelectorFromString(@"initWithDevice:error:"), laite, &virhe);
    if (!asiakas) { fprintf(stderr, "HID-asiakas: %s\n", virhe.localizedDescription.UTF8String); return 3; }
    jono = dispatch_queue_create("simkosketus", DISPATCH_QUEUE_SERIAL);

    if ([komento isEqualToString:@"tap"] && argc >= 5) {
      CGPoint p = CGPointMake(atof(argv[3]), atof(argv[4]));
      double kesto = argc >= 6 ? atof(argv[5]) : 0.08;
      if (!laheta(p, ALAS)) return 4;
      nuku(kesto);
      if (!laheta(p, YLOS)) return 4;
    } else if ([komento isEqualToString:@"veto"] && argc >= 7) {
      CGPoint a = CGPointMake(atof(argv[3]), atof(argv[4])), b = CGPointMake(atof(argv[5]), atof(argv[6]));
      double kesto = argc >= 8 ? atof(argv[7]) : 0.3;
      if (!laheta(a, ALAS)) return 4;
      nuku(0.03);
      liiku(a, b, kesto);
      if (!laheta(b, YLOS)) return 4;
    } else if ([komento isEqualToString:@"polku"] && argc >= 5) {
      CGPoint edellinen = CGPointMake(0, 0);
      for (int i = 3; i < argc; i++) {
        double x = 0, y = 0, dt = 0;
        int n = sscanf(argv[i], "%lf,%lf,%lf", &x, &y, &dt);
        if (n < 2) return kaytto();
        CGPoint p = CGPointMake(x, y);
        if (i == 3) { if (!laheta(p, ALAS)) return 4; }
        else liiku(edellinen, p, MAX(dt, 20) / 1000.0);
        if (i == argc - 1 && !laheta(p, YLOS)) return 4;
        edellinen = p;
      }
    } else return kaytto();
    nuku(0.05);
    return 0;
  }
}
