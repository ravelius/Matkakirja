// MatkakirjaPurku.mm — kuvan purku tekstuuriksi ImageIO:lla (Natiiviseppä, 24.9.2026). Oma tiedosto
// Kartan puolella, jotta Pelikoodarin MatkakirjaKuvat.mm (kuvanvalitsin) pysyy koskemattomana.
// Nimet MatkakirjaKuvat_Pura / _Vapauta säilyvät (Kartta/NapaKannet.cs kutsuu niitä).

#import <Foundation/Foundation.h>
#import <ImageIO/ImageIO.h>
#import <CoreGraphics/CoreGraphics.h>
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
