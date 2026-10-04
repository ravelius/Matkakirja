// MatkakirjaPurku.mm — linnapaketin häviöttömän pakkauksen purku (Natiiviseppä, 5.10.2026, juna 143).
//
// Linnan ASTC/glb/json tulevat ämpäristä Brotli-pakattuina (<polku>.br, Linnanrakentajan pakkaaja q11, lgwin 24),
// ja ne puretaan Applen Compression-kehyksellä (COMPRESSION_BROTLI, iOS 15+; projektin minimi 17.0): ei kolmannen
// osapuolen koodia. Purettu tiedosto tallennetaan sisältövarastoon puretun sha256:n nimellä (DioraamaLevyvalimuisti),
// joten purku tehdään vain ensilatauksessa.
//
// Unity-puoli: Linssit/Unity/DioraamaPakkaus.cs.
//   MatkakirjaPurku_Puskuri(algoritmi, lahde, pituus, kohde, kohdePituus) → kirjoitetut tavut, < 0 virhe
//   MatkakirjaPurku_Tiedosto(algoritmi, lahdePolku, kohdePolku, &kirjoitettu) → 0 ok, < 0 virhe (virtapurku 1 Mt:n
//       puskureilla: 89 Mt:n atlas ei käy muistissa kokonaan kahdesti)
//   algoritmi: 1 = Brotli, 2 = LZMA. Kutsutaan taustasäikeestä; ei Unityn API:a.
//
// Linkitys: libcompression .linker_option-käskyllä (ks. MatkakirjaKuvat.mm), ei pbxproj-muutosta.

#import <Foundation/Foundation.h>
#include <compression.h>
#include <stdio.h>
#include <stdlib.h>

__asm__(".linker_option \"-lcompression\"\n");

static compression_algorithm Algoritmi(int a)
{
    switch (a)
    {
        case 1: return COMPRESSION_BROTLI;
        case 2: return COMPRESSION_LZMA;
        default: return (compression_algorithm)0;
    }
}

extern "C" long long MatkakirjaPurku_Puskuri(int algoritmi, const uint8_t* lahde, int pituus, uint8_t* kohde, long long kohdePituus)
{
    compression_algorithm a = Algoritmi(algoritmi);
    if (a == 0 || lahde == NULL || kohde == NULL || pituus <= 0 || kohdePituus <= 0) return -1;
    compression_stream s;
    if (compression_stream_init(&s, COMPRESSION_STREAM_DECODE, a) != COMPRESSION_STATUS_OK) return -2;
    s.src_ptr = lahde; s.src_size = (size_t)pituus;
    s.dst_ptr = kohde; s.dst_size = (size_t)kohdePituus;
    compression_status t = compression_stream_process(&s, COMPRESSION_STREAM_FINALIZE);
    long long kirjoitettu = kohdePituus - (long long)s.dst_size;
    compression_stream_destroy(&s);
    if (t == COMPRESSION_STATUS_END) return kirjoitettu;
    return t == COMPRESSION_STATUS_OK ? -3 : -4;   // -3: kohde loppui kesken (purettu suurempi kuin manifesti), -4: virhe
}

extern "C" int MatkakirjaPurku_Tiedosto(int algoritmi, const char* lahdePolku, const char* kohdePolku, long long* kirjoitettu)
{
    if (kirjoitettu) *kirjoitettu = 0;
    compression_algorithm a = Algoritmi(algoritmi);
    if (a == 0 || lahdePolku == NULL || kohdePolku == NULL) return -1;
    FILE* sisaan = fopen(lahdePolku, "rb");
    if (sisaan == NULL) return -5;
    FILE* ulos = fopen(kohdePolku, "wb");
    if (ulos == NULL) { fclose(sisaan); return -6; }
    const size_t P = 1 << 20;
    uint8_t* sp = (uint8_t*)malloc(P);
    uint8_t* dp = (uint8_t*)malloc(P);
    compression_stream s;
    int tulos = -2;
    if (sp != NULL && dp != NULL && compression_stream_init(&s, COMPRESSION_STREAM_DECODE, a) == COMPRESSION_STATUS_OK)
    {
        long long yht = 0;
        bool loppu = false;
        s.src_size = 0;
        s.dst_ptr = dp; s.dst_size = P;
        tulos = -4;
        for (;;)
        {
            if (s.src_size == 0 && !loppu)
            {
                size_t n = fread(sp, 1, P, sisaan);
                if (ferror(sisaan)) { tulos = -7; break; }
                loppu = n < P;
                s.src_ptr = sp; s.src_size = n;
            }
            size_t ennen = s.dst_size;
            compression_status t = compression_stream_process(&s, loppu ? COMPRESSION_STREAM_FINALIZE : 0);
            if (t == COMPRESSION_STATUS_ERROR) { tulos = -4; break; }
            // Katkennut virta: syöte loppui, eikä FINALIZE-kutsu tuottanut enää mitään eikä virta päättynyt.
            if (t == COMPRESSION_STATUS_OK && loppu && s.src_size == 0 && s.dst_size == ennen) { tulos = -3; break; }
            size_t valmista = P - s.dst_size;
            if (valmista > 0 && (t == COMPRESSION_STATUS_END || s.dst_size == 0))
            {
                if (fwrite(dp, 1, valmista, ulos) != valmista) { tulos = -8; break; }
                yht += (long long)valmista;
                s.dst_ptr = dp; s.dst_size = P;
            }
            if (t == COMPRESSION_STATUS_END) { tulos = 0; break; }
        }
        compression_stream_destroy(&s);
        if (kirjoitettu) *kirjoitettu = yht;
    }
    free(sp); free(dp);
    fclose(sisaan);
    if (fclose(ulos) != 0 && tulos == 0) tulos = -8;
    return tulos;
}
