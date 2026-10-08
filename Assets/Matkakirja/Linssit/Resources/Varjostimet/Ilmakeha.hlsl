// ILMAKEHÄ VARJOSTIMIIN (Linssiseppä 2, 8.10.2026; PT: pallon maisema, kohdat 1–3). Sama laskenta kuin Ydin IlmakehaLut (CPU-vertailu,
// IlmakehaLutTestit): Karttasepän LUTit globaaleina (KaupunkiIlmakeha asettaa joka kehys). Maailma: Unity x itä, y ylös, z pohjoinen
// (Cesiumin georeferenssi kaupungin keskellä); etäisyydet metreinä. Tekseli = u·(W−1) → tekstuurikoordinaatti (tekseli + 0,5) / W.
#ifndef MATKAKIRJA_ILMAKEHA
#define MATKAKIRJA_ILMAKEHA

TEXTURE2D(_IlmLapaisy); SAMPLER(sampler_IlmLapaisy);
TEXTURE3D(_IlmTaivas); SAMPLER(sampler_IlmTaivas);
TEXTURE3D(_IlmAp); SAMPLER(sampler_IlmAp);
TEXTURE3D(_IlmApLapaisy); SAMPLER(sampler_IlmApLapaisy);
TEXTURE2D(_IlmPilvet); SAMPLER(sampler_IlmPilvet);
float4 _IlmAurinko;     // xyz suunta aurinkoon (maailma), w = auringon zeniitti asteina
float4 _IlmParam;       // x kameran korkeus m, y valotus, z ilmaperspektiivin voima 0–1, w taivaan voima 0–1
float4 _IlmPilviParam;  // x peitto 0–1, y varjon voima, z jakso m (uv1), w pilvikorkeus m
float4 _IlmTuuli;       // xy pilvikentän siirtymä m (tuuli × aika)
float4 _IlmMaailma;     // x metriä maailmayksikköä kohden (georeferenssin skaala)
float4 _IlmPilviKerros; // x pilvikerros 0/1 (KaupunkiIlmakeha.Pilvet), y pohja m, z paksuus m (pallon pilvet, raportin kohta 6a)

static const float IlmR = 6360.0, IlmRT = 6460.0, IlmApKm = 200.0;

float IlmTekseli(float u, float n) { return (saturate(u) * (n - 1.0) + 0.5) / n; }

float2 IlmLapaisyUv(float korkeusM, float mu)
{
    float r = IlmR + korkeusM * 0.001, H = sqrt(IlmRT * IlmRT - IlmR * IlmR), rho = sqrt(max(0.0, r * r - IlmR * IlmR));
    float d = -r * mu + sqrt(max(0.0, r * r * (mu * mu - 1.0) + IlmRT * IlmRT));
    float dMin = IlmRT - r, dMax = rho + H;
    return float2((d - dMin) / (dMax - dMin), rho / H);
}

float3 IlmLapaisy(float korkeusM, float mu)
{
    float r = IlmR + korkeusM * 0.001;
    if (mu < 0.0 && r * r * (mu * mu - 1.0) + IlmR * IlmR >= 0.0) return 0;
    float2 uv = IlmLapaisyUv(korkeusM, mu);
    return SAMPLE_TEXTURE2D_LOD(_IlmLapaisy, sampler_IlmLapaisy, float2(IlmTekseli(uv.x, 256), IlmTekseli(uv.y, 64)), 0).rgb;
}

float IlmTaivasU(float korkeusM, float zen)
{
    float r = IlmR + korkeusM * 0.001, beta = acos(sqrt(r * r - IlmR * IlmR) / r), zha = PI - beta;
    return zen < zha ? (1.0 - sqrt(max(0.0, 1.0 - zen / zha))) * 0.5 : 0.5 + 0.5 * sqrt(max(0.0, (zen - zha) / beta));
}

// Tasot 0,5 / 1,5 / 3 km; z tason sisällä aurinko 0–100° (w·31), lineaarisesti tasojen välillä.
void IlmTasot(float korkeusM, out int t0, out int t1, out float th)
{
    if (korkeusM <= 500.0) { t0 = 0; t1 = 0; th = 0; }
    else if (korkeusM < 1500.0) { t0 = 0; t1 = 1; th = (korkeusM - 500.0) / 1000.0; }
    else if (korkeusM < 3000.0) { t0 = 1; t1 = 2; th = (korkeusM - 1500.0) / 1500.0; }
    else { t0 = 2; t1 = 2; th = 0; }
}
float IlmZ(int taso) { return (taso * 32.0 + saturate(_IlmAurinko.w / 100.0) * 31.0 + 0.5) / 96.0; }
float IlmTasoM(int taso) { return taso == 0 ? 500.0 : taso == 1 ? 1500.0 : 3000.0; }

/// Taivaan radianssi (auringon irradianssi 1) katsesuuntaan d (maailma, normalisoitu).
float3 IlmTaivas(float3 d)
{
    float zen = acos(clamp(d.y, -1.0, 1.0));
    float2 vh = d.xz, sh = _IlmAurinko.xz;
    float c = (dot(vh, vh) > 1e-8 && dot(sh, sh) > 1e-8) ? dot(normalize(vh), normalize(sh)) : 1.0;
    float v = IlmTekseli(sqrt(saturate((1.0 - c) * 0.5)), 64);
    int t0, t1; float th; IlmTasot(_IlmParam.x, t0, t1, th);
    float3 a = SAMPLE_TEXTURE3D_LOD(_IlmTaivas, sampler_IlmTaivas, float3(IlmTekseli(IlmTaivasU(IlmTasoM(t0), zen), 96), v, IlmZ(t0)), 0).rgb;
    float3 b = SAMPLE_TEXTURE3D_LOD(_IlmTaivas, sampler_IlmTaivas, float3(IlmTekseli(IlmTaivasU(IlmTasoM(t1), zen), 96), v, IlmZ(t1)), 0).rgb;
    return lerp(a, b, th);
}

/// Ilmaperspektiivi pinnalle etäisyydellä etM katsesuunnassa d: RGB sironta (L_in), A ei käytössä; T = läpäisy kanavittain.
void IlmIlmaperspektiivi(float etM, float3 d, out float3 sironta, out float3 lapaisy)
{
    float u = IlmTekseli(sqrt(saturate(etM * 0.001 / IlmApKm)), 32);
    float v = IlmTekseli(sqrt(saturate((1.0 - dot(d, _IlmAurinko.xyz)) * 0.5)), 32);
    int t0, t1; float th; IlmTasot(_IlmParam.x, t0, t1, th);
    sironta = lerp(SAMPLE_TEXTURE3D_LOD(_IlmAp, sampler_IlmAp, float3(u, v, IlmZ(t0)), 0).rgb, SAMPLE_TEXTURE3D_LOD(_IlmAp, sampler_IlmAp, float3(u, v, IlmZ(t1)), 0).rgb, th);
    lapaisy = lerp(SAMPLE_TEXTURE3D_LOD(_IlmApLapaisy, sampler_IlmApLapaisy, float3(u, v, IlmZ(t0)), 0).rgb, SAMPLE_TEXTURE3D_LOD(_IlmApLapaisy, sampler_IlmApLapaisy, float3(u, v, IlmZ(t1)), 0).rgb, th);
}

/// Pilvikentän peitto pilvitason pisteessä xz (m georeferenssin origosta, tuuli mukana; Karttasepän pilvet-tiheys.json: kolme näytettä
/// toiston estoon). Sama kenttä varjoille (IlmPilvi) ja pilvikerrokselle (IlmPilviKerros), joten varjot osuvat pilvien alle.
float IlmPilviPeitto(float2 xz, float peitto)
{
    float2 uv = (xz + _IlmTuuli.xy) / _IlmPilviParam.z;
    float2x2 r1 = float2x2(0.7986, -0.6018, 0.6018, 0.7986), r2 = float2x2(0.4848, 0.8746, -0.8746, 0.4848);   // 37°, −61°
    float D = 0.55 * SAMPLE_TEXTURE2D(_IlmPilvet, sampler_IlmPilvet, uv).r
            + 0.25 * SAMPLE_TEXTURE2D(_IlmPilvet, sampler_IlmPilvet, mul(r1, uv) * 0.413 + float2(0.31, 0.17)).r
            + 0.20 * SAMPLE_TEXTURE2D(_IlmPilvet, sampler_IlmPilvet, mul(r2, uv) * 0.137 + float2(0.71, 0.43)).r;
    float G = SAMPLE_TEXTURE2D(_IlmPilvet, sampler_IlmPilvet, uv * 2.3).g;
    return smoothstep(1.0 - peitto, 1.0 - peitto + 0.2, D - 0.15 * (1.0 - G));
}

/// Pilvien peitto pisteen p (metreinä georeferenssin origosta) yllä auringon suunnassa (pilvikorkeudella).
float IlmPilvi(float3 p)
{
    float korkeus = _IlmPilviParam.w;
    float2 xz = p.xz + _IlmAurinko.xz / max(_IlmAurinko.y, 0.1) * max(0.0, korkeus - p.y);
    return IlmPilviPeitto(xz, _IlmPilviParam.x);
}

/// Pallon pilvikerros (Ydin KaupunkiPilvet): katsesäde d leikataan kolmella tasolla pohjan ja katon välillä (kamera pohjan alla),
/// tason tiheys = peitto × paino (keskitaso täysi, pohja ja katto ohuempia ja hieman pienemmällä peitolla), valo auringosta
/// läpäisyllä ja itsevarjolla (yksi näyte aurinkoa kohti), ympäristövalo taivaasta, ilmaperspektiivi matkan mukaan ja häivytys
/// horisonttiin (40–80 km) ja kameran noustessa pohjan lähelle. Palauttaa esikerrotun radianssin (rgb) ja peiton (a).
float4 IlmPilviKerros(float3 d)
{
    float kamera = _IlmParam.x, pohja = _IlmPilviKerros.y, paksuus = _IlmPilviKerros.z, m = _IlmMaailma.x;
    if (_IlmPilviKerros.x < 0.5 || kamera >= pohja) return 0;   // tasainen ehto (sama koko kuvalle)
    // Ei pikselikohtaisia haaroja ennen näytteitä (derivaatat): alaspäin katsovat säteet nollataan kertoimella.
    float ylos = step(1e-3, d.y), dy = max(d.y, 1e-3);
    float2 kxz = _WorldSpaceCameraPos.xz * m;
    float3 s = _IlmAurinko.xyz;
    float paiva = smoothstep(-0.05, 0.05, s.y);
    float3 ymparisto = IlmTaivas(float3(0, 1, 0)) * 1.2 + IlmTaivas(normalize(float3(s.x, 0.05, s.z))) * 0.3;
    float vaihe = 0.55 + 1.2 * pow(saturate(dot(d, s)), 6.0);   // eteenpäin sironta: hopeareuna auringon puolella
    float3 c = 0; float T = 1;
    [unroll] for (int i = 0; i < 3; i++)
    {
        float h = pohja + paksuus * i * 0.5, t = min((h - kamera) / dy, 100000.0);
        float2 xz = kxz + d.xz * t;
        float paino = i == 1 ? 1.0 : 0.6;
        float a = saturate(IlmPilviPeitto(xz, _IlmPilviParam.x - (i == 1 ? 0.0 : 0.08)) * paino * 0.85) * ylos;
        float2 kohti = xz + s.xz / max(s.y, 0.1) * paksuus * 0.5;
        float itse = exp(-2.5 * IlmPilviPeitto(kohti, _IlmPilviParam.x));
        float3 valo = IlmLapaisy(h, s.y) * itse * vaihe * 0.32 * paiva + ymparisto * (0.6 + 0.4 * (1.0 - itse));
        float3 sironta, lapaisy; IlmIlmaperspektiivi(t, d, sironta, lapaisy);
        valo = valo * lapaisy + sironta;
        float hiipuma = (1.0 - smoothstep(40000.0, 80000.0, t)) * (1.0 - smoothstep(pohja - 600.0, pohja - 300.0, kamera));
        a *= hiipuma;
        c += T * a * valo; T *= 1.0 - a;
    }
    return float4(c, 1.0 - T) * _IlmParam.w;
}

float3 IlmSavytys(float3 x) { return 1.0 - exp(-x); }

#endif
