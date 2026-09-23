// MatkakirjaLehti.mm — kaupunkilehti natiivin Matkakirjan WKWebView-kuoressa.
//
// Verkkopuoli (verkkopelin PR #2942, js/lehtikuori.js):
//   https://matkakirja.app/index.html?lehti=<kaupunki-id>
// avaa pelkän kaupunkilehden (ei lautaa, ei tallennusta) ja lähettää viestit
//   window.webkit.messageHandlers.matkakirja.postMessage(
//       {tapahtuma: 'lehti-auki' | 'lehti-suljettu', kaupunki})
//
// Unity-puoli: Scripts/Peli/LehtiKuori.cs (GameObject "MatkakirjaLehti").
//   MatkakirjaLehti_Avaa(osoite)  avaa lehden koko ruudulle Unityn näkymän päälle
//   MatkakirjaLehti_Sulje()       sulkee lehden ILMAN viestiä Unityyn (Unity
//                                 tietää itse sulkeneensa ja herättää Suljettu-
//                                 tapahtuman C#-puolella)
// Kun pelaaja sulkee lehden (sivun viesti 'lehti-suljettu' tai varareitin
// sulje-nappi), näkymä poistetaan ja Unityyn lähtee täsmälleen kerran
//   UnitySendMessage("MatkakirjaLehti", "LehtiSuljettu", kaupunki)
//
// Muisti: WKUserContentController pitää viestinkäsittelijänsä VAHVASTI, ja
// käsittelijä pitää näkymää → retain cycle. Siksi käsittelijänä on erillinen
// MatkakirjaHeikkoValittaja, joka viittaa varsinaiseen olioon heikosti, ja
// sulkeminen poistaa käsittelijän myös eksplisiittisesti.
//
// Vaatii: ARC (Unityn UnityFramework-kohteessa CLANG_ENABLE_OBJC_ARC = YES)
// ja WebKit.framework linkitettynä (Editor/LehtiKuoriXcode.cs lisää sen).

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

#if !__has_feature(objc_arc)
#error "MatkakirjaLehti.mm vaatii ARC:n (-fobjc-arc)"
#endif

// Unityn trampoliinin funktiot. Allekirjoitukset TÄSMÄLLEEN kuten Unity
// 6000.3:n Classes/Unity/UnityInterface.h:ssa (rivit 91 ja 257). Xcodessa
// Prefix.pch tuo UnityInterface.h:n jo ennen tätä tiedostoa, jolloin nämä
// ovat identtisiä uudelleenjulistuksia (sallittu); jos Unity joskus muuttaa
// allekirjoitusta, käännös pysähtyy tähän eikä linkitykseen tai ajoon.
// Ilman Unityä (syntaksitarkistus) nämä ovat ainoat julistukset.
extern "C" {
    UIViewController* UnityGetGLViewController(void);
    void UnitySendMessage(const char* obj, const char* method, const char* msg);
}

static NSString* const kKasittelijanNimi = @"matkakirja";
static const char* const kUnityOlio = "MatkakirjaLehti";
static const char* const kUnityMetodi = "LehtiSuljettu";
// Jos sivu ei ilmoita 'lehti-auki' tässä ajassa (esim. tuntematon kaupunki,
// jolloin verkkopuoli ei avaa mitään), näytetään sulje-nappi.
static const NSTimeInterval kAukiAikarajaS = 12.0;

#pragma mark - Heikko välittäjä

@interface MatkakirjaHeikkoValittaja : NSObject <WKScriptMessageHandler>
@property (nonatomic, weak) id<WKScriptMessageHandler> kohde;
- (instancetype)initKohteella:(id<WKScriptMessageHandler>)kohde;
@end

@implementation MatkakirjaHeikkoValittaja
- (instancetype)initKohteella:(id<WKScriptMessageHandler>)kohde
{
    if ((self = [super init])) _kohde = kohde;
    return self;
}
- (void)userContentController:(WKUserContentController*)ohjain
      didReceiveScriptMessage:(WKScriptMessage*)viesti
{
    [self.kohde userContentController:ohjain didReceiveScriptMessage:viesti];
}
@end

#pragma mark - Lehtikuori

@interface MatkakirjaLehtiKuori : NSObject <WKScriptMessageHandler, WKNavigationDelegate, WKUIDelegate>
@property (nonatomic, strong) UIView* kehys;           // koko ruutu, peittää Unityn
@property (nonatomic, strong) WKWebView* nakyma;       // safe arean sisällä
@property (nonatomic, strong) UIActivityIndicatorView* latausosoitin;
@property (nonatomic, strong) UIView* varareitti;      // viesti + sulje-nappi
@property (nonatomic, copy) NSString* kaupunki;
@property (nonatomic, copy) NSString* sallittuIsanta;  // viestit ja navigointi vain tästä
@property (nonatomic) BOOL lehtiAuki;                  // sivu ilmoitti 'lehti-auki'
@property (nonatomic) NSUInteger sukupolvi;            // vanhentaa aikarajat
- (void)avaaOsoite:(NSURL*)osoite kaupunki:(NSString*)kaupunki;
- (void)suljeIlmoittaen:(BOOL)ilmoitaUnitylle;
@end

static MatkakirjaLehtiKuori* gLehti = nil;

static UIColor* MatkakirjaTausta(void)
{
    // Sama kuin verkkopuolen body.lehtikuori (css/styles.css): #2a241c.
    return [UIColor colorWithRed:0x2a / 255.0 green:0x24 / 255.0 blue:0x1c / 255.0 alpha:1.0];
}

// Kaupunki osoitteen kyselystä ?lehti=<id> (varalla, jos viestissä ei ole).
static NSString* MatkakirjaKaupunkiOsoitteesta(NSURL* osoite)
{
    NSURLComponents* osat = [NSURLComponents componentsWithURL:osoite resolvingAgainstBaseURL:NO];
    for (NSURLQueryItem* kohta in osat.queryItems)
        if ([kohta.name isEqualToString:@"lehti"] && kohta.value.length > 0) return kohta.value;
    return @"";
}

@implementation MatkakirjaLehtiKuori

- (void)avaaOsoite:(NSURL*)osoite kaupunki:(NSString*)kaupunki
{
    UIViewController* ohjain = UnityGetGLViewController();
    UIView* isanta = ohjain.view;
    if (isanta == nil)
    {
        NSLog(@"[MatkakirjaLehti] Unityn näkymää ei ole; lehti suljetaan heti");
        self.kaupunki = kaupunki;
        [self ilmoitaUnitylle];
        return;
    }

    self.kaupunki = kaupunki;
    self.sallittuIsanta = osoite.host.lowercaseString;
    self.lehtiAuki = NO;
    self.sukupolvi += 1;

    // Kehys koko ruudulle: peittää Unityn myös lovien ja kotipalkin alueelta.
    UIView* kehys = [[UIView alloc] initWithFrame:isanta.bounds];
    kehys.translatesAutoresizingMaskIntoConstraints = NO;
    kehys.backgroundColor = MatkakirjaTausta();
    [isanta addSubview:kehys];
    [NSLayoutConstraint activateConstraints:@[
        [kehys.topAnchor constraintEqualToAnchor:isanta.topAnchor],
        [kehys.bottomAnchor constraintEqualToAnchor:isanta.bottomAnchor],
        [kehys.leadingAnchor constraintEqualToAnchor:isanta.leadingAnchor],
        [kehys.trailingAnchor constraintEqualToAnchor:isanta.trailingAnchor],
    ]];
    self.kehys = kehys;

    WKWebViewConfiguration* asetukset = [[WKWebViewConfiguration alloc] init];
    asetukset.allowsInlineMediaPlayback = YES;
    // Lehden luenta alkaa sivun omasta napista; ei vaadita erillistä elettä.
    asetukset.mediaTypesRequiringUserActionForPlayback = WKAudiovisualMediaTypeNone;
    MatkakirjaHeikkoValittaja* valittaja = [[MatkakirjaHeikkoValittaja alloc] initKohteella:self];
    [asetukset.userContentController addScriptMessageHandler:valittaja name:kKasittelijanNimi];

    WKWebView* nakyma = [[WKWebView alloc] initWithFrame:CGRectZero configuration:asetukset];
    nakyma.translatesAutoresizingMaskIntoConstraints = NO;
    nakyma.navigationDelegate = self;
    nakyma.UIDelegate = self;
    nakyma.opaque = NO;  // ei valkoista välähdystä ennen ensimmäistä piirtoa
    nakyma.backgroundColor = MatkakirjaTausta();
    nakyma.scrollView.backgroundColor = MatkakirjaTausta();
    // Näkymä on jo safe arean sisällä: sivun env(safe-area-inset-*) = 0.
    nakyma.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    // Safarin Web Inspector kehitysvaiheessa. Unityn UnityFramework-kohde ei
    // määrittele DEBUG-lippua, joten oletus on päällä; julkaisussa pois
    // määrittelyllä MATKAKIRJA_EI_TARKASTINTA.
#ifndef MATKAKIRJA_EI_TARKASTINTA
    if (@available(iOS 16.4, *)) nakyma.inspectable = YES;
#endif
    [kehys addSubview:nakyma];
    UILayoutGuide* turva = kehys.safeAreaLayoutGuide;
    [NSLayoutConstraint activateConstraints:@[
        [nakyma.topAnchor constraintEqualToAnchor:turva.topAnchor],
        [nakyma.bottomAnchor constraintEqualToAnchor:turva.bottomAnchor],
        [nakyma.leadingAnchor constraintEqualToAnchor:turva.leadingAnchor],
        [nakyma.trailingAnchor constraintEqualToAnchor:turva.trailingAnchor],
    ]];
    self.nakyma = nakyma;

    UIActivityIndicatorView* osoitin =
        [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleLarge];
    osoitin.translatesAutoresizingMaskIntoConstraints = NO;
    osoitin.color = [UIColor colorWithWhite:0.9 alpha:1.0];
    osoitin.hidesWhenStopped = YES;
    [kehys addSubview:osoitin];
    [NSLayoutConstraint activateConstraints:@[
        [osoitin.centerXAnchor constraintEqualToAnchor:kehys.centerXAnchor],
        [osoitin.centerYAnchor constraintEqualToAnchor:kehys.centerYAnchor],
    ]];
    [osoitin startAnimating];
    self.latausosoitin = osoitin;

    NSURLRequest* pyynto = [NSURLRequest requestWithURL:osoite
                                            cachePolicy:NSURLRequestUseProtocolCachePolicy
                                        timeoutInterval:20.0];
    [nakyma loadRequest:pyynto];

    // Varareitti: jos sivu ei ilmoita avanneensa lehteä ajoissa.
    NSUInteger tamaSukupolvi = self.sukupolvi;
    __weak MatkakirjaLehtiKuori* heikko = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(kAukiAikarajaS * NSEC_PER_SEC)),
                   dispatch_get_main_queue(), ^{
        MatkakirjaLehtiKuori* vahva = heikko;
        if (vahva == nil || vahva.sukupolvi != tamaSukupolvi || vahva.kehys == nil) return;
        if (!vahva.lehtiAuki) [vahva naytaVarareitti:@"Lehti ei avautunut."];
    });
}

- (void)suljeIlmoittaen:(BOOL)ilmoitaUnitylle
{
    if (self.kehys == nil) return;  // jo suljettu
    self.sukupolvi += 1;
    WKWebView* nakyma = self.nakyma;
    [nakyma stopLoading];
    nakyma.navigationDelegate = nil;
    nakyma.UIDelegate = nil;
    [nakyma.configuration.userContentController removeScriptMessageHandlerForName:kKasittelijanNimi];
    // Pysäyttää luennan ja muun median heti (sivu ei ehdi sitä itse).
    [nakyma loadHTMLString:@"" baseURL:nil];
    [self.kehys removeFromSuperview];
    self.nakyma = nil;
    self.kehys = nil;
    self.latausosoitin = nil;
    self.varareitti = nil;
    if (ilmoitaUnitylle) [self ilmoitaUnitylle];
}

- (void)ilmoitaUnitylle
{
    const char* kaupunki = (self.kaupunki ?: @"").UTF8String;
    UnitySendMessage(kUnityOlio, kUnityMetodi, kaupunki ? kaupunki : "");
}

- (void)naytaVarareitti:(NSString*)teksti
{
    [self.latausosoitin stopAnimating];
    if (self.kehys == nil || self.varareitti != nil) return;

    UIStackView* pino = [[UIStackView alloc] init];
    pino.axis = UILayoutConstraintAxisVertical;
    pino.alignment = UIStackViewAlignmentCenter;
    pino.spacing = 16.0;
    pino.translatesAutoresizingMaskIntoConstraints = NO;

    UILabel* otsikko = [[UILabel alloc] init];
    otsikko.text = teksti;
    otsikko.textColor = [UIColor colorWithWhite:0.92 alpha:1.0];
    otsikko.font = [UIFont preferredFontForTextStyle:UIFontTextStyleHeadline];
    otsikko.numberOfLines = 0;
    otsikko.textAlignment = NSTextAlignmentCenter;

    UIColor* kulta = [UIColor colorWithRed:0.95 green:0.85 blue:0.6 alpha:1.0];
    UIButtonConfiguration* muoto = [UIButtonConfiguration plainButtonConfiguration];
    muoto.title = @"Sulje lehti";
    muoto.baseForegroundColor = kulta;
    muoto.contentInsets = NSDirectionalEdgeInsetsMake(12, 24, 12, 24);  // koskettava alue >= 44 pt
    muoto.background.strokeColor = kulta;
    muoto.background.strokeWidth = 1.0;
    muoto.background.cornerRadius = 8.0;
    UIButton* nappi = [UIButton buttonWithConfiguration:muoto primaryAction:nil];
    nappi.accessibilityLabel = @"Sulje lehti";
    [nappi addTarget:self action:@selector(suljeNapista) forControlEvents:UIControlEventTouchUpInside];

    [pino addArrangedSubview:otsikko];
    [pino addArrangedSubview:nappi];
    [self.kehys addSubview:pino];  // web-näkymän päälle
    UILayoutGuide* turva = self.kehys.safeAreaLayoutGuide;
    [NSLayoutConstraint activateConstraints:@[
        [pino.centerXAnchor constraintEqualToAnchor:turva.centerXAnchor],
        [pino.centerYAnchor constraintEqualToAnchor:turva.centerYAnchor],
        [pino.leadingAnchor constraintGreaterThanOrEqualToAnchor:turva.leadingAnchor constant:24],
        [pino.trailingAnchor constraintLessThanOrEqualToAnchor:turva.trailingAnchor constant:-24],
    ]];
    self.varareitti = pino;
}

- (void)suljeNapista
{
    [self suljeIlmoittaen:YES];
}

#pragma mark WKScriptMessageHandler

- (void)userContentController:(WKUserContentController*)ohjain
      didReceiveScriptMessage:(WKScriptMessage*)viesti
{
    if (self.kehys == nil) return;
    // Vain pääkehyksestä ja lehden omasta isännästä (ei upotetuista sivuista).
    if (!viesti.frameInfo.isMainFrame) return;
    NSString* isanta = viesti.frameInfo.securityOrigin.host.lowercaseString;
    if (self.sallittuIsanta.length > 0 && ![isanta isEqualToString:self.sallittuIsanta]) return;
    if (![viesti.body isKindOfClass:[NSDictionary class]]) return;

    NSDictionary* runko = (NSDictionary*)viesti.body;
    id tapahtuma = runko[@"tapahtuma"];
    id kaupunki = runko[@"kaupunki"];
    if (![tapahtuma isKindOfClass:[NSString class]]) return;
    if ([kaupunki isKindOfClass:[NSString class]] && [kaupunki length] > 0) self.kaupunki = kaupunki;

    if ([tapahtuma isEqualToString:@"lehti-auki"])
    {
        self.lehtiAuki = YES;
        [self.latausosoitin stopAnimating];
        [self.varareitti removeFromSuperview];
        self.varareitti = nil;
    }
    else if ([tapahtuma isEqualToString:@"lehti-suljettu"])
    {
        [self suljeIlmoittaen:YES];
    }
}

#pragma mark WKNavigationDelegate

- (void)webView:(WKWebView*)nakyma
    decidePolicyForNavigationAction:(WKNavigationAction*)toimi
                    decisionHandler:(void (^)(WKNavigationActionPolicy))paatos
{
    NSURL* osoite = toimi.request.URL;
    NSString* kaava = osoite.scheme.lowercaseString;
    BOOL paakehys = toimi.targetFrame == nil || toimi.targetFrame.isMainFrame;
    BOOL omaIsanta = [osoite.host.lowercaseString isEqualToString:self.sallittuIsanta];
    if ([kaava isEqualToString:@"about"] || [kaava isEqualToString:@"blob"] || [kaava isEqualToString:@"data"])
    {
        paatos(WKNavigationActionPolicyAllow);
        return;
    }
    if (!paakehys || omaIsanta)
    {
        // Upotukset (iframe) sallitaan; pääkehys pysyy lehden isännässä.
        paatos(WKNavigationActionPolicyAllow);
        return;
    }
    // Ulkoiset linkit (esim. Wikipedia, Commons-lisenssi) Safariin, ei kuoreen.
    if (toimi.navigationType == WKNavigationTypeLinkActivated &&
        ([kaava isEqualToString:@"https"] || [kaava isEqualToString:@"http"] || [kaava isEqualToString:@"mailto"]))
    {
        [[UIApplication sharedApplication] openURL:osoite options:@{} completionHandler:nil];
    }
    paatos(WKNavigationActionPolicyCancel);
}

- (void)webView:(WKWebView*)nakyma didFinishNavigation:(WKNavigation*)navigointi
{
    // Sivu latautui; osoitin pysyy kunnes lehti ilmoittaa aukeamisesta
    // (aikaraja hoitaa tapauksen, jossa se ei koskaan ilmoita).
}

static BOOL MatkakirjaPeruttu(NSError* virhe)
{
    return [virhe.domain isEqualToString:NSURLErrorDomain] && virhe.code == NSURLErrorCancelled;
}

- (void)webView:(WKWebView*)nakyma
    didFailProvisionalNavigation:(WKNavigation*)navigointi
                       withError:(NSError*)virhe
{
    if (MatkakirjaPeruttu(virhe)) return;
    NSLog(@"[MatkakirjaLehti] lataus epäonnistui: %@", virhe.localizedDescription);
    [self naytaVarareitti:@"Lehteä ei voitu ladata.\nTarkista verkkoyhteys."];
}

- (void)webView:(WKWebView*)nakyma didFailNavigation:(WKNavigation*)navigointi withError:(NSError*)virhe
{
    if (MatkakirjaPeruttu(virhe)) return;
    NSLog(@"[MatkakirjaLehti] sivu keskeytyi: %@", virhe.localizedDescription);
    if (!self.lehtiAuki) [self naytaVarareitti:@"Lehteä ei voitu ladata."];
}

- (void)webViewWebContentProcessDidTerminate:(WKWebView*)nakyma
{
    // Sivun prosessi kaatui (tyypillisesti muistipaine Unityn rinnalla).
    NSLog(@"[MatkakirjaLehti] web-prosessi päättyi");
    self.lehtiAuki = NO;
    [self naytaVarareitti:@"Lehti sulkeutui odottamatta."];
}

#pragma mark WKUIDelegate

// window.open ja target=_blank: avataan Safarissa, ei uutta näkymää kuoreen.
- (WKWebView*)webView:(WKWebView*)nakyma
    createWebViewWithConfiguration:(WKWebViewConfiguration*)asetukset
               forNavigationAction:(WKNavigationAction*)toimi
                    windowFeatures:(WKWindowFeatures*)ominaisuudet
{
    NSURL* osoite = toimi.request.URL;
    NSString* kaava = osoite.scheme.lowercaseString;
    if ([kaava isEqualToString:@"https"] || [kaava isEqualToString:@"http"])
        [[UIApplication sharedApplication] openURL:osoite options:@{} completionHandler:nil];
    return nil;
}

@end

#pragma mark - C-rajapinta Unitylle

static void MatkakirjaPaasaikeessa(dispatch_block_t tyo)
{
    if ([NSThread isMainThread]) tyo();
    else dispatch_async(dispatch_get_main_queue(), tyo);
}

extern "C" void MatkakirjaLehti_Avaa(const char* osoite)
{
    // Kopioidaan merkkijono heti: Unityn marshalointipuskuri vapautuu paluussa.
    NSString* teksti = osoite ? [NSString stringWithUTF8String:osoite] : nil;
    MatkakirjaPaasaikeessa(^{
        NSURL* url = teksti.length > 0 ? [NSURL URLWithString:teksti] : nil;
        NSString* kaava = url.scheme.lowercaseString;
        BOOL kelpaa = url != nil && url.host.length > 0 &&
            ([kaava isEqualToString:@"https"] || [kaava isEqualToString:@"http"]);
        // Edellinen lehti suljetaan hiljaa: C#-puoli on jo herättänyt sen
        // Suljettu-tapahtuman ennen uutta Avaa-kutsua (LehtiKuori.Avaa).
        if (gLehti != nil) [gLehti suljeIlmoittaen:NO];
        if (gLehti == nil) gLehti = [[MatkakirjaLehtiKuori alloc] init];
        if (!kelpaa)
        {
            NSLog(@"[MatkakirjaLehti] kelvoton osoite: %@", teksti);
            gLehti.kaupunki = url ? MatkakirjaKaupunkiOsoitteesta(url) : @"";
            [gLehti ilmoitaUnitylle];  // ettei Unity jää odottamaan
            return;
        }
        [gLehti avaaOsoite:url kaupunki:MatkakirjaKaupunkiOsoitteesta(url)];
    });
}

extern "C" void MatkakirjaLehti_Sulje(void)
{
    MatkakirjaPaasaikeessa(^{
        [gLehti suljeIlmoittaen:NO];
    });
}
