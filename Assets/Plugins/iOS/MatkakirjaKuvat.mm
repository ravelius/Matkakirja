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
