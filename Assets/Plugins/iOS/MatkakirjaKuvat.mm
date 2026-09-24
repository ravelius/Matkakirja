// MatkakirjaKuvat.mm — kuvien valinta palautteeseen ja kuvavinkkiin (Pelikoodari, 23.9.2026).
//
// Webissä <input type=file> + canvas-pienennys (js/ehdotukset.js skaalaaEhdotusKuva:
// pisin sivu ≤ sivu px, jpeg-laatu 0.85). Natiivissa PHPickerViewController: ei
// kuvakirjaston käyttölupaa (picker ajetaan omassa prosessissaan ja antaa vain
// valitut kuvat), joten Info.plistiin ei tarvita NSPhotoLibraryUsageDescriptionia.
//
// Kuvat pienennetään ImageIO:n pienoiskuvana (kCGImageSourceCreateThumbnailWithTransform:
// EXIF-orientaatio huomioitu, HEIC purkautuu, koko kuvaa ei pureta muistiin), piirretään
// sRGB-pohjalle valkoiselle taustalle (kuten canvas: jpeg ilman läpinäkyvyyttä) ja
// pakataan jpegiksi 0.85. Toisin kuin webissä, valmiiksi pientäkään jpegiä ei lähetetä
// sellaisenaan: uudelleenpakkaus pudottaa EXIF-tiedot (sijainti) ja kääntää kuvan pystyyn.
//
// Unity-puoli: Scripts/Peli/Kuvanvalitsin.cs.
//   MatkakirjaKuvat_Valitse(pyynto, enintaan, sivu, kuva, valmis)
//     kuva(pyynto, indeksi, tavut, pituus)   yksi kutsu per onnistunut kuva, valintajärjestyksessä;
//                                             tavut ovat voimassa vain kutsun ajan (C# kopioi)
//     valmis(pyynto, maara)                   aina tasan kerran; 0 = peruttu, ei onnistunut
//                                             tai valitsin oli jo auki
//   Molemmat kutsutaan pääsäikeessä (iOS:n Unity-säie), eivät koskaan Valitse-kutsun sisältä.
//
// Linkitys: Unityn UnityFramework-kohteessa CLANG_ENABLE_MODULES ei ole päällä, joten
// @import ei toimisi eikä PhotosUI/ImageIO linkittyisi itsestään. .linker_option kirjoittaa
// objektitiedostoon LC_LINKER_OPTION-käskyn, jonka linkkeri lukee kuten modulien
// autolinkin: frameworkeja ei tarvitse lisätä pbxproj:iin eikä .metaan.
//
// Vaatii: ARC, iOS 14+ (projektin minimi 17.0).

#import <UIKit/UIKit.h>
#import <PhotosUI/PhotosUI.h>
#import <ImageIO/ImageIO.h>

#if !__has_feature(objc_arc)
#error "MatkakirjaKuvat.mm vaatii ARC:n (-fobjc-arc)"
#endif

__asm__(".linker_option \"-framework\", \"PhotosUI\"\n"
        ".linker_option \"-framework\", \"ImageIO\"\n");

// Unityn trampoliini (Classes/UnityAppController.mm: UNITY_EXPORT extern "C").
extern "C" UIViewController* UnityGetGLViewController(void);

typedef void (*MatkakirjaKuvat_Kuva)(int pyynto, int indeksi, const void* tavut, int pituus);
typedef void (*MatkakirjaKuvat_Valmis)(int pyynto, int maara);

static const CGFloat MatkakirjaKuvat_Laatu = 0.85;   // web EHDOTUS_KUVAN_LAATU

// --- pienennys ---------------------------------------------------------------------

/// CGImage → jpeg sRGB-pohjalla (valkoinen tausta, ei alfaa). nil, jos piirto ei onnistu.
static NSData* MatkakirjaKuvat_Jpeg(CGImageRef kuva)
{
    size_t w = CGImageGetWidth(kuva), h = CGImageGetHeight(kuva);
    if (w == 0 || h == 0) return nil;
    CGColorSpaceRef srgb = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
    CGContextRef c = CGBitmapContextCreate(NULL, w, h, 8, 0, srgb,
                                           (CGBitmapInfo)kCGImageAlphaNoneSkipLast | kCGBitmapByteOrder32Big);
    CGColorSpaceRelease(srgb);
    if (!c) return nil;
    CGContextSetRGBFillColor(c, 1, 1, 1, 1);
    CGContextFillRect(c, CGRectMake(0, 0, w, h));
    CGContextSetInterpolationQuality(c, kCGInterpolationHigh);
    CGContextDrawImage(c, CGRectMake(0, 0, w, h), kuva);
    CGImageRef valmis = CGBitmapContextCreateImage(c);
    CGContextRelease(c);
    if (!valmis) return nil;
    NSData* jpeg = UIImageJPEGRepresentation([UIImage imageWithCGImage:valmis], MatkakirjaKuvat_Laatu);
    CGImageRelease(valmis);
    return jpeg;
}

/// Kuvatiedosto (heic, jpeg, png …) → pienennetty jpeg. sivu <= 0: ei pienennystä.
static NSData* MatkakirjaKuvat_Tiedostosta(NSURL* url, int sivu)
{
    NSDictionary* lahdeAsetus = @{ (id)kCGImageSourceShouldCache: @NO };
    CGImageSourceRef lahde = CGImageSourceCreateWithURL((__bridge CFURLRef)url, (__bridge CFDictionaryRef)lahdeAsetus);
    if (!lahde) return nil;
    NSData* tulos = nil;
    CFDictionaryRef ominaisuudet = CGImageSourceCopyPropertiesAtIndex(lahde, 0, NULL);
    if (ominaisuudet)
    {
        NSDictionary* o = (__bridge NSDictionary*)ominaisuudet;
        NSInteger w = [o[(id)kCGImagePropertyPixelWidth] integerValue];
        NSInteger h = [o[(id)kCGImagePropertyPixelHeight] integerValue];
        CFRelease(ominaisuudet);
        NSInteger suurin = MAX(w, h);
        if (suurin > 0)
        {
            // Pienoiskuva ei suurenna, mutta raja ei silti saa ylittää alkuperäistä.
            NSInteger raja = (sivu > 0 && sivu < suurin) ? sivu : suurin;
            NSDictionary* asetus = @{
                (id)kCGImageSourceCreateThumbnailFromImageAlways: @YES,
                (id)kCGImageSourceCreateThumbnailWithTransform: @YES,   // EXIF-orientaatio
                (id)kCGImageSourceThumbnailMaxPixelSize: @(raja),
                (id)kCGImageSourceShouldCacheImmediately: @YES,
            };
            CGImageRef kuva = CGImageSourceCreateThumbnailAtIndex(lahde, 0, (__bridge CFDictionaryRef)asetus);
            if (kuva)
            {
                tulos = MatkakirjaKuvat_Jpeg(kuva);
                CGImageRelease(kuva);
            }
        }
    }
    CFRelease(lahde);
    return tulos;
}

/// Varareitti: UIImage (orientaatio imageOrientationissa) → pienennetty jpeg.
static NSData* MatkakirjaKuvat_Kuvasta(UIImage* kuva, int sivu)
{
    CGSize koko = kuva.size;   // pisteinä, orientaatio huomioitu
    CGFloat w = koko.width * kuva.scale, h = koko.height * kuva.scale;
    CGFloat suurin = MAX(w, h);
    if (suurin <= 0) return nil;
    CGFloat kerroin = (sivu > 0 && suurin > sivu) ? sivu / suurin : 1;
    CGSize uusi = CGSizeMake(MAX(1, round(w * kerroin)), MAX(1, round(h * kerroin)));
    UIGraphicsImageRendererFormat* muoto = [UIGraphicsImageRendererFormat formatForTraitCollection:
        [UITraitCollection traitCollectionWithDisplayScale:1]];
    muoto.scale = 1;
    muoto.opaque = YES;
    muoto.preferredRange = UIGraphicsImageRendererFormatRangeStandard;   // sRGB
    UIGraphicsImageRenderer* piirtaja = [[UIGraphicsImageRenderer alloc] initWithSize:uusi format:muoto];
    UIImage* pieni = [piirtaja imageWithActions:^(UIGraphicsImageRendererContext* ctx) {
        [[UIColor whiteColor] setFill];
        [ctx fillRect:CGRectMake(0, 0, uusi.width, uusi.height)];
        [kuva drawInRect:CGRectMake(0, 0, uusi.width, uusi.height)];
    }];
    return UIImageJPEGRepresentation(pieni, MatkakirjaKuvat_Laatu);
}

// --- valitsin ----------------------------------------------------------------------

@interface MatkakirjaKuvat : NSObject <PHPickerViewControllerDelegate, UIAdaptivePresentationControllerDelegate>
@property (nonatomic) int pyynto;
@property (nonatomic) int sivu;
@property (nonatomic) MatkakirjaKuvat_Kuva kuvaKutsu;
@property (nonatomic) MatkakirjaKuvat_Valmis valmisKutsu;
@property (nonatomic) BOOL kasitelty;   // didFinishPicking tai pyyhkäisy alas: vain kerran
@end

static MatkakirjaKuvat* MatkakirjaKuvat_nykyinen = nil;   // pitää delegaatin elossa

@implementation MatkakirjaKuvat

/// Pääsäikeessä: kuvat järjestyksessä, sitten valmis. Vapauttaa delegaatin.
- (void)palauta:(NSArray*)jpegit
{
    int maara = 0;
    for (id d in jpegit)
    {
        if (![d isKindOfClass:[NSData class]]) continue;
        NSData* data = (NSData*)d;
        if (self.kuvaKutsu) self.kuvaKutsu(self.pyynto, maara, data.bytes, (int)data.length);
        maara++;
    }
    if (self.valmisKutsu) self.valmisKutsu(self.pyynto, maara);
    if (MatkakirjaKuvat_nykyinen == self) MatkakirjaKuvat_nykyinen = nil;
}

- (void)picker:(PHPickerViewController*)picker didFinishPicking:(NSArray<PHPickerResult*>*)results
{
    if (self.kasitelty) return;
    self.kasitelty = YES;
    [picker dismissViewControllerAnimated:YES completion:nil];

    NSUInteger n = results.count;
    if (n == 0)
    {
        // Peruttu. Paluu seuraavalla kierroksella, ei delegaattikutsun sisältä.
        dispatch_async(dispatch_get_main_queue(), ^{ [self palauta:@[]]; });
        return;
    }

    NSMutableArray* jpegit = [NSMutableArray arrayWithCapacity:n];
    for (NSUInteger i = 0; i < n; i++) [jpegit addObject:[NSNull null]];
    dispatch_group_t ryhma = dispatch_group_create();
    int sivu = self.sivu;
    NSString* tyyppi = @"public.image";   // UTTypeImage.identifier

    for (NSUInteger i = 0; i < n; i++)
    {
        NSItemProvider* tarjoaja = results[i].itemProvider;
        if (![tarjoaja hasItemConformingToTypeIdentifier:tyyppi] && ![tarjoaja canLoadObjectOfClass:[UIImage class]])
            continue;
        dispatch_group_enter(ryhma);
        void (^talleta)(NSData*) = ^(NSData* jpeg) {
            if (jpeg.length > 0) { @synchronized (jpegit) { jpegit[i] = jpeg; } }
            else NSLog(@"MATKAKIRJA kuvat: kuva %lu ei auennut", (unsigned long)i);
            dispatch_group_leave(ryhma);
        };
        // Varareitti: UIImage-olio (jos tiedostomuotoa ei saada).
        void (^oliona)(void) = ^{
            if (![tarjoaja canLoadObjectOfClass:[UIImage class]]) { talleta(nil); return; }
            [tarjoaja loadObjectOfClass:[UIImage class] completionHandler:^(id<NSItemProviderReading> olio, NSError* virhe) {
                NSData* jpeg = nil;
                if ([(NSObject*)olio isKindOfClass:[UIImage class]])
                    @autoreleasepool { jpeg = MatkakirjaKuvat_Kuvasta((UIImage*)olio, sivu); }
                else if (virhe) NSLog(@"MATKAKIRJA kuvat: UIImage: %@", virhe);
                talleta(jpeg);
            }];
        };
        if (![tarjoaja hasItemConformingToTypeIdentifier:tyyppi]) { oliona(); continue; }
        // Tiedosto on voimassa vain käsittelijän ajan, joten pienennys tehdään tässä (taustasäie).
        [tarjoaja loadFileRepresentationForTypeIdentifier:tyyppi completionHandler:^(NSURL* url, NSError* virhe) {
            NSData* jpeg = nil;
            if (url) @autoreleasepool { jpeg = MatkakirjaKuvat_Tiedostosta(url, sivu); }
            else if (virhe) NSLog(@"MATKAKIRJA kuvat: tiedosto: %@", virhe);
            if (jpeg.length > 0) talleta(jpeg);
            else oliona();
        }];
    }

    dispatch_group_notify(ryhma, dispatch_get_main_queue(), ^{
        NSArray* valmiit;
        @synchronized (jpegit) { valmiit = [jpegit copy]; }
        [self palauta:valmiit];
    });
}

// Pyyhkäisy alas: PHPicker kutsuu yleensä didFinishPicking tyhjällä, tämä on varmistus.
- (void)presentationControllerDidDismiss:(UIPresentationController*)presentationController
{
    if (self.kasitelty) return;
    self.kasitelty = YES;
    dispatch_async(dispatch_get_main_queue(), ^{ [self palauta:@[]]; });
}

@end

extern "C" void MatkakirjaKuvat_Valitse(int pyynto, int enintaan, int sivu,
                                        MatkakirjaKuvat_Kuva kuva, MatkakirjaKuvat_Valmis valmis)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController* isanta = UnityGetGLViewController();
        while (isanta.presentedViewController && !isanta.presentedViewController.isBeingDismissed)
            isanta = isanta.presentedViewController;
        if (MatkakirjaKuvat_nykyinen != nil || isanta == nil)
        {
            NSLog(@"MATKAKIRJA kuvat: valitsin on jo auki tai näkymää ei ole");
            if (valmis) valmis(pyynto, 0);
            return;
        }

        MatkakirjaKuvat* d = [MatkakirjaKuvat new];
        d.pyynto = pyynto;
        d.sivu = sivu;
        d.kuvaKutsu = kuva;
        d.valmisKutsu = valmis;
        MatkakirjaKuvat_nykyinen = d;

        PHPickerConfiguration* asetus = [[PHPickerConfiguration alloc] init];
        asetus.filter = [PHPickerFilter imagesFilter];
        asetus.selectionLimit = MAX(1, enintaan);   // 0 olisi rajaton
        // Nykyinen muoto: HEIC tulee HEICinä (ImageIO purkaa), ei turhaa muunnosta.
        asetus.preferredAssetRepresentationMode = PHPickerConfigurationAssetRepresentationModeCurrent;
        if (enintaan > 1) asetus.selection = PHPickerConfigurationSelectionOrdered;   // iOS 15+

        PHPickerViewController* valitsin = [[PHPickerViewController alloc] initWithConfiguration:asetus];
        valitsin.delegate = d;
        [isanta presentViewController:valitsin animated:YES completion:nil];
        valitsin.presentationController.delegate = d;
    });
}

// --- purku tekstuuriksi: napakalotit (Natiiviseppä, 24.9.2026) ---------------------
//
// Unityn iOS-soitin ei pura WebP:tä (ImageConversion: PNG, JPG, EXR; libiPhone-lib.a:ssa ei
// libwebp:tä), mutta ImageIO purkaa sen iOS 14:stä alkaen. Kartta/NapaKannet.cs kutsuu tätä
// taustasäikeessä (ImageIO ja CGBitmapContext ovat säieturvallisia).
//
//   MatkakirjaKuvat_Pura(tavut, pituus, sivu, &leveys, &korkeus, &koko)
//     tavut      kuvatiedosto (webp, png, jpeg …), luetaan vain kutsun ajan
//     sivu       > 0: pisin sivu enintään tämä (ImageIO:n pienoiskuva); 0 = alkuperäinen koko
//     paluu      malloc-puskuri: RGBA8, ESIKERROTTU alfa, sRGB-tavut, rivi 0 = kuvan ALAreuna
//                (Unityn tekstuurin järjestys) ja perässä koko mipmap-ketju 1×1:een asti
//                (Texture2D.LoadRawTextureData-muoto); NULL = purku epäonnistui
//   MatkakirjaKuvat_Vapauta(puskuri)  free
//
// Esikerrottu data on tahallinen: CGBitmapContext ei tue suoraa alfaa, ja esikerrotun datan
// suodatus ja 2×2-keskiarvomipit ovat oikein myös häivytetyllä reunalla (suora alfa sotkisi
// läpinäkyvien pikselien mustan värin reunaan). Varjostin (Napakansi.shader) jakaa alfan pois.

extern "C" void* MatkakirjaKuvat_Pura(const void* tavut, int pituus, int sivu,
                                      int* leveys, int* korkeus, int* koko)
{
    *leveys = 0; *korkeus = 0; *koko = 0;
    if (tavut == NULL || pituus <= 0) return NULL;
    @autoreleasepool
    {
        CFDataRef data = CFDataCreate(NULL, (const UInt8*)tavut, pituus);
        if (!data) return NULL;
        NSDictionary* lahdeAsetus = @{ (id)kCGImageSourceShouldCache: @NO };
        CGImageSourceRef lahde = CGImageSourceCreateWithData(data, (__bridge CFDictionaryRef)lahdeAsetus);
        CFRelease(data);
        if (!lahde) return NULL;
        CGImageRef kuva = NULL;
        if (sivu > 0)
        {
            NSDictionary* asetus = @{
                (id)kCGImageSourceCreateThumbnailFromImageAlways: @YES,
                (id)kCGImageSourceThumbnailMaxPixelSize: @(sivu),
            };
            kuva = CGImageSourceCreateThumbnailAtIndex(lahde, 0, (__bridge CFDictionaryRef)asetus);
        }
        else kuva = CGImageSourceCreateImageAtIndex(lahde, 0, NULL);
        CFRelease(lahde);
        if (!kuva) return NULL;

        size_t w = CGImageGetWidth(kuva), h = CGImageGetHeight(kuva);
        size_t yht = 0;
        for (size_t lw = w, lh = h;;)
        {
            yht += lw * lh * 4;
            if (lw == 1 && lh == 1) break;
            lw = MAX((size_t)1, lw / 2); lh = MAX((size_t)1, lh / 2);
        }
        uint8_t* puskuri = (w > 0 && h > 0 && yht < INT_MAX) ? (uint8_t*)calloc(yht, 1) : NULL;
        if (!puskuri) { CGImageRelease(kuva); return NULL; }

        CGColorSpaceRef srgb = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
        CGContextRef c = CGBitmapContextCreate(puskuri, w, h, 8, w * 4, srgb,
                                               (CGBitmapInfo)kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
        CGColorSpaceRelease(srgb);
        if (!c) { free(puskuri); CGImageRelease(kuva); return NULL; }
        CGContextSetBlendMode(c, kCGBlendModeCopy);
        CGContextSetInterpolationQuality(c, kCGInterpolationHigh);
        // Bittikartan muistin ensimmäinen rivi on kuvan yläreuna; Unityn tekstuurissa rivi 0 on
        // alareuna (v = 0), joten piirto käännetään pystysuunnassa.
        CGContextTranslateCTM(c, 0, h);
        CGContextScaleCTM(c, 1, -1);
        CGContextDrawImage(c, CGRectMake(0, 0, w, h), kuva);
        CGContextRelease(c);
        CGImageRelease(kuva);

        // Mipit 2×2-keskiarvona esikerrotusta datasta (pariton reuna toistaa viimeisen rivin/sarakkeen).
        uint8_t* lahdeTaso = puskuri;
        size_t lw = w, lh = h;
        while (lw > 1 || lh > 1)
        {
            size_t uw = MAX((size_t)1, lw / 2), uh = MAX((size_t)1, lh / 2);
            uint8_t* uusi = lahdeTaso + lw * lh * 4;
            for (size_t y = 0; y < uh; y++)
            {
                size_t y0 = MIN(2 * y, lh - 1), y1 = MIN(2 * y + 1, lh - 1);
                for (size_t x = 0; x < uw; x++)
                {
                    size_t x0 = MIN(2 * x, lw - 1), x1 = MIN(2 * x + 1, lw - 1);
                    const uint8_t* a = lahdeTaso + (y0 * lw + x0) * 4;
                    const uint8_t* b = lahdeTaso + (y0 * lw + x1) * 4;
                    const uint8_t* d = lahdeTaso + (y1 * lw + x0) * 4;
                    const uint8_t* e = lahdeTaso + (y1 * lw + x1) * 4;
                    uint8_t* o = uusi + (y * uw + x) * 4;
                    for (int k = 0; k < 4; k++) o[k] = (uint8_t)((a[k] + b[k] + d[k] + e[k] + 2) / 4);
                }
            }
            lahdeTaso = uusi; lw = uw; lh = uh;
        }
        *leveys = (int)w; *korkeus = (int)h; *koko = (int)yht;
        return puskuri;
    }
}

extern "C" void MatkakirjaKuvat_Vapauta(void* puskuri)
{
    free(puskuri);
}
