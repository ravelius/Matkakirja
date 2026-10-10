// KAPEA GLB-LUKIJA DIORAAMALLE (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 3 ja 5).
// OMA LUKIJA (ei Matkakirja.Peli.GlbLukija, jota ei muokata): dioraaman glb poikkeaa maamerkkien glb:stä
// kolmella tavalla, joita yleinen lukija ei tue: (1) YKSI mesh, USEITA primitiivejä (yksi per käytetty pinta,
// extras.pinta/materiaalin nimi = pinnan id), (2) COLOR_0 UNSIGNED_BYTE NORMALIZED VEC4 (AO/lämpö; yleinen
// lukija hylkää kaiken normalisoinnin), (3) indeksit UINT32.
//
// Tuettu: glTF 2.0 binääri, yksi solmu jolla on mesh (ei hierarkiaa), kolmiot (mode 4), POSITION/NORMAL float
// VEC3, TEXCOORD_0 float VEC2 (rakennuskoneen oma tasoprojektio — EI käännetä, ks. kohta 3), COLOR_0
// UNSIGNED_BYTE normalized VEC4, indeksit ubyte/ushort/uint, skin + animaatiot (alla), morph-kohteet (POSITION, 6.10.), sparse float (9.10.). Muu (ulkoiset puskurit) →
// GlbVirhe, ei arvausta.
//
// unityyn = true: (x, y, z) → (x, y, −z) paikoille ja normaaleille, kolmion kiertosuunta käännetään
// (i0, i2, i1) — sama kaava kuin kohdan 0 Unity-muunnos (+Z_unity = pohjoinen). unityyn = false palauttaa
// kanonisen kehyksen (+Z = etelä) sellaisenaan.
//
// ERÄ 2B (kohta 4 "3D-HAHMOT", ali-agentti P4b, 29.9.2026): GlbMalli.Solmut — KOKO solmuhierarkia
// (pienoisfiguurien nivelet, tools/dioraama/glb.mjs:n kirjoitaMonisolmuGlb) TRS:nä (translation/rotation/
// scale) + vanhemman indeksi + omat osat JOKA solmulle. VANHA Nimi/Osat-luku (ensimmäinen solmu, jolla on
// mesh) säilyy TÄSMÄLLEEN ennallaan yksisolmuisille (rakennusosien) glb:ille — Solmut on sille silloin
// 1 alkion lista, joka kaikuu samat Osat. "solmuhierarkia ei tuettu" -esto poistettu (ei tarvita — vanhoilla
// fixtureilla ei ollut children-kenttää, joten poisto ei muuta niiden käytöstä).
//
// unityyn solmun TRS:lle: translation.z negatoidaan (sama kuin POSITION). rotation-kvaternio (x,y,z,w):
// PEILAUS z:n suhteen on konjugaatio R·M·R, missä R = diag(1,1,-1) ja M kvaternion rotaatiomatriisi —
// merkkilaskulla M'_ij = R_i·R_j·M_ij, joka TÄSMÄLLEEN toteutuu kvaterniolla q' = (x, y, −z, −w) (todennettu
// komponenteittain: esim. M'_13 = -M_13 ja M(q')_13 = 2(x·(-z) + (-w)·y) = -2(xz+wy) = -M_13, jne. kaikille
// 9 komponentille). scale EI muutu (skaalan etumerkki ei kuvaa kätisyyttä — kätisyyden kääntää jo paikkojen/
// normaalien peilaus + kiertosuunnan kääntö; ja diag(sx,sy,sz) kommutoi R:n kanssa: R·S·R = S).
//
// SKINNATUT HAHMOT (Siirtoseppä 2.10.2026, omistaja loki 59b9df127: valmiit CC0-mallit, sulava liike): skins[] (nivelsolmut +
// inverseBindMatrices), primitiivien JOINTS_0/WEIGHTS_0 ja animations[] (kanavat translation/rotation/scale, LINEAR/STEP/
// CUBICSPLINE). unityyn: avainkehysten T ja R kuten solmun TRS yllä; inverseBindMatrix M' = R·M·R eli alkio (rivi, sarake)
// negatoidaan, kun TÄSMÄLLEEN toinen indekseistä on 2 (sama konjugaatio kuin kvaterniolle). Nivelet/painot eivät muutu.
using System;
using System.Collections.Generic;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Yhden pinnan primitiivi tilan glb:ssä.</summary>
    public sealed class GlbOsa
    {
        public string Pinta;
        public float[] Paikat;
        public float[] Normaalit;
        public float[] Uv;
        /// <summary>LINNA (Siirtoseppä 29.9.2026, Blender → Unity): TEXCOORD_1 = leivotun valon atlas-UV (float VEC2,
        /// ei käännetä kuten ei UV0:kaan); null, jos primitiivillä ei ole toista UV-karttaa (rakennuskoneen glb).</summary>
        public float[] Uv1;
        /// <summary>LINNA: materiaalin baseColorTexture → images-indeksi (GlbMalli.Kuvat), tai -1.</summary>
        public int Kuva = -1;
        /// <summary>PALLO (Linssiseppä 8.10.2026): materiaalin normalTexture ja pbrMetallicRoughness.metallicRoughnessTexture
        /// (glTF: G = karheus, B = metallisuus; Blenderin ORM-vienti R = AO) → images-indeksit, tai -1.</summary>
        public int NormaaliKuva = -1, OrmKuva = -1;
        /// <summary>PALLO (Linssiseppä 8.10.2026, kupu): materiaalin doubleSided (kankaan sisä- ja ulkopinta).</summary>
        public bool KaksiPuolinen;
        /// <summary>COLOR_0 raakoina tavuina RGBA (R = AO, G = lämpö, B = 0, A = 255; kohta 3).</summary>
        public byte[] Varit;
        /// <summary>ERÄ 2B: materiaalin pbrMetallicRoughness.baseColorFactor [r,g,b,a] (LINEAARINEN, glTF-spec) —
        /// null, jos materiaali/kenttä puuttuu (vanhat testifixturet). Rakennusosien glb:issä (DioraamaRakennus)
        /// TÄTÄ ei käytetä — värin antaa Rakennus.Pinnat[pinta].Vari. Pienoisfiguureissa (hahmot3d/&lt;id&gt;.glb)
        /// TÄMÄ ON AINOA lähde: rakennuskone (hahmot3d.mjs:n teeVariHaku) on jo ratkaissut henkilön OMAN värin
        /// (malli3d.varit[pinta]) tai pankin oletuksen (PINNAT[pinta].vari — EI rakennus.json:ssa hahmojen
        /// pinnoille, koska niitä ei käytetä rakennuksen geometriassa) ja leiponut tuloksen tähän.</summary>
        public float[] Vari;
        /// <summary>LR v46b: alfaleikkauksen raja materiaalin alphaModesta (MASK: alphaCutoff, oletus 0,5; BLEND: 0,5, koska dioraamassa ei
        /// ole läpikuultavaa passia); 0 = OPAQUE tai puuttuva.</summary>
        public float AlfaRaja;
        public int[] Kolmiot;
        /// <summary>SKIN: JOINTS_0 (4 per kärki, indeksejä skinin Nivelet-listaan) tai null.</summary>
        public int[] Nivelet;
        /// <summary>SKIN: WEIGHTS_0 (4 per kärki, 0–1) tai null.</summary>
        public float[] Painot;
        /// <summary>MORPH (FACEIT, Siirtoseppä 6.10.2026): primitiivin targets[] POSITION-deltoina (3 per kärki, unityyn-muunnos
        /// kuten paikoilla) nimineen (mesh.extras.targetNames; ilman nimiä "muoto&lt;i&gt;"). Tyhjä, jos muotoja ei ole.</summary>
        public List<(string Nimi, float[] Deltat)> Muodot = new List<(string, float[])>();
    }

    /// <summary>SKIN: nivelsolmut (indeksit GlbMalli.Solmut-listaan) ja käänteiset sidontamatriisit (16 per nivel,
    /// sarakkeittain kuten glTF).</summary>
    public sealed class GlbSkin
    {
        public int[] Nivelet;
        public float[] KaanteisetSidonnat;
        public int Luuranko = -1;
    }

    /// <summary>Animaation yksi kanava: solmun T (0), R (1) tai S (2) avainkehyksinä. Arvot = 3 tai 4 per aika;
    /// CUBICSPLINE luetaan arvopisteiksi (tangentit pois).</summary>
    public sealed class GlbKanava
    {
        public int Solmu;
        public int Polku;
        public float[] Ajat;
        public float[] Arvot;
        public bool Askel;
    }

    public sealed class GlbAnimaatio
    {
        public string Nimi;
        public float Kesto;
        public List<GlbKanava> Kanavat = new List<GlbKanava>();
    }

    /// <summary>ERÄ 2B: yksi solmu solmuhierarkiassa (pienoisfiguurin nivel). Translation/Rotation/Scale ovat
    /// PAIKALLISIA (suhteessa Vanhempaan) — sama sopimus kuin glTF node TRS ja tools/dioraama/glb.mjs:n
    /// kirjoitaMonisolmuGlb. Rotation on kvaternio [x,y,z,w] (oletus identiteetti [0,0,0,1], jos solmulla ei
    /// ole rotation-kenttää — nykyinen rakennuskone kirjoittaa vain translationin, mutta lukija on yleinen).</summary>
    public sealed class GlbSolmu
    {
        public string Nimi;
        /// <summary>Vanhemman indeksi Solmut-listassa, -1 = juuri (ei vanhempaa).</summary>
        public int Vanhempi = -1;
        public float[] Translation = { 0f, 0f, 0f };
        public float[] Rotation = { 0f, 0f, 0f, 1f };
        public float[] Scale = { 1f, 1f, 1f };
        /// <summary>Tämän solmun mesh pinnoittain — tyhjä lista, jos solmulla ei ole meshiä (puhdas nivel).</summary>
        public List<GlbOsa> Osat = new List<GlbOsa>();
        /// <summary>LINNA: solmun extras (Blenderin custom properties, esim. valo:/liekki:/ikkuna:-tyhjien väri, säde,
        /// voima, koko); null, jos kenttää ei ole.</summary>
        public Dictionary<string, object> Extras;
        /// <summary>SKIN: skins-indeksi (GlbMalli.Skinit), jos solmun mesh on skinnattu; muuten -1.</summary>
        public int Skin = -1;
    }

    /// <summary>Tilan koko glb: yksi mesh (solmun nimi), primitiivi per käytetty pinta. Nimi/Osat = ENSIMMÄINEN
    /// solmu, jolla on mesh (vanha, muuttumaton sopimus yksisolmuisille rakennusosien/tilojen glb:ille).
    /// Solmut = ERÄ 2B: koko hierarkia (ks. GlbSolmu) — käytä TÄTÄ pienoisfiguureille (DioraamaHahmot3D).</summary>
    public sealed class GlbMalli
    {
        public string Nimi;
        public List<GlbOsa> Osat = new List<GlbOsa>();
        public List<GlbSolmu> Solmut = new List<GlbSolmu>();
        /// <summary>LINNA (ulkokuori): glb:n sisään upotetut kuvat (images[i].bufferView) tavuina (JPEG/PNG) images-
        /// järjestyksessä; null alkio, jos kuva on ulkoinen (uri) — ulkoisia ei tueta.</summary>
        public List<byte[]> Kuvat = new List<byte[]>();
        public List<GlbSkin> Skinit = new List<GlbSkin>();
        public List<GlbAnimaatio> Animaatiot = new List<GlbAnimaatio>();

        public GlbAnimaatio Animaatio(string nimi)
        {
            foreach (var a in Animaatiot) if (a.Nimi == nimi) return a;
            return null;
        }

        /// <summary>Tilan osat KAIKISTA mesh-solmuista (Siirtoseppä 10.10.): Linnanrakentajan kävelyosat viedään solmu per pinta
        /// (ranta-1499: kallio, vesi, rantakivi), ja pelkkä Osat piirsi vain ensimmäisen. Yhdistetään vain, kun solmuilla ja
        /// niiden vanhemmilla ei ole siirtoa, kiertoa eikä skaalaa (paikat ovat jo mallin koordinaateissa); muuten Osat ennallaan.</summary>
        public List<GlbOsa> KaikkiOsat()
        {
            int meshSolmuja = 0;
            foreach (var s in Solmut) if (s.Osat.Count > 0) meshSolmuja++;
            if (meshSolmuja < 2) return Osat;
            var kaikki = new List<GlbOsa>();
            foreach (var s in Solmut)
            {
                if (s.Osat.Count == 0) continue;
                for (var v = s; v != null; v = v.Vanhempi >= 0 && v.Vanhempi < Solmut.Count ? Solmut[v.Vanhempi] : null)
                    if (!Perusasento(v)) return Osat;
                kaikki.AddRange(s.Osat);
            }
            return kaikki;
        }

        static bool Perusasento(GlbSolmu s) =>
            s.Translation[0] == 0f && s.Translation[1] == 0f && s.Translation[2] == 0f &&
            s.Rotation[0] == 0f && s.Rotation[1] == 0f && s.Rotation[2] == 0f && Math.Abs(s.Rotation[3]) == 1f &&   // unityyn: w → −w
            s.Scale[0] == 1f && s.Scale[1] == 1f && s.Scale[2] == 1f;
    }

    public static class DioraamaGlb
    {
        /// <summary>glTF alphaMode → alfaraja (GlbOsa.AlfaRaja).</summary>
        public static float AlfaRajaMateriaalista(Dictionary<string, object> materiaali)
        {
            if (materiaali == null) return 0f;
            string tila = MiniJson.Teksti(materiaali, "alphaMode");
            if (tila == "MASK") return (float)(MiniJson.Luku(materiaali, "alphaCutoff") ?? 0.5);
            return tila == "BLEND" ? 0.5f : 0f;
        }

        const uint Magic = 0x46546C67, JsonPala = 0x4E4F534A, BinPala = 0x004E4942;

        /// <summary>Lukee dioraaman glb:n. unityyn = true kääntää Unityn kehykseen (ks. tiedoston alun huomautus).</summary>
        public static GlbMalli Lue(byte[] glb, bool unityyn)
        {
            if (glb == null || glb.Length < 20) throw new DioraamaGlbVirhe("liian lyhyt");
            if (U32(glb, 0) != Magic) throw new DioraamaGlbVirhe("ei glTF-binääri");
            if (U32(glb, 4) != 2) throw new DioraamaGlbVirhe("versio " + U32(glb, 4));
            int pituus = (int)Math.Min(U32(glb, 8), (uint)glb.Length);
            Dictionary<string, object> json = null;
            int binAlku = -1, binPituus = 0;
            for (int k = 12; k + 8 <= pituus;)
            {
                int n = (int)U32(glb, k); uint tyyppi = U32(glb, k + 4);
                if (n < 0 || k + 8 + n > pituus) throw new DioraamaGlbVirhe("pala yli tiedoston");
                if (tyyppi == JsonPala && json == null) json = MiniJson.Objekti(MiniJson.Jasenna(Encoding.UTF8.GetString(glb, k + 8, n)));
                else if (tyyppi == BinPala && binAlku < 0) { binAlku = k + 8; binPituus = n; }
                k += 8 + ((n + 3) & ~3);
            }
            if (json == null) throw new DioraamaGlbVirhe("JSON-pala puuttuu");
            return new Lukija(json, glb, binAlku, binPituus, unityyn).Kokoa();
        }

        static uint U32(byte[] b, int i) => (uint)(b[i] | b[i + 1] << 8 | b[i + 2] << 16 | b[i + 3] << 24);

        sealed class Lukija
        {
            readonly Dictionary<string, object> j;
            readonly byte[] b;
            readonly int binAlku, binPituus;
            readonly bool unityyn;

            public Lukija(Dictionary<string, object> json, byte[] glb, int alku, int pituus, bool unityyn)
            { j = json; b = glb; binAlku = alku; binPituus = pituus; this.unityyn = unityyn; }

            List<object> Lista(string nimi) => MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, nimi));

            Dictionary<string, object> Alkio(string lista, int i)
            {
                var l = Lista(lista);
                if (i < 0 || i >= l.Count) throw new DioraamaGlbVirhe($"{lista}[{i}] puuttuu");
                return MiniJson.Objekti(l[i]);
            }

            public GlbMalli Kokoa()
            {
                var solmut = Lista("nodes");
                int solmuIndeksi = -1;
                for (int i = 0; i < solmut.Count; i++)
                    if (MiniJson.Luku(MiniJson.Objekti(solmut[i]), "mesh").HasValue) { solmuIndeksi = i; break; }
                if (solmuIndeksi < 0) throw new DioraamaGlbVirhe("ei solmua, jolla on mesh");
                var solmu = MiniJson.Objekti(solmut[solmuIndeksi]);
                string nimi = MiniJson.Teksti(solmu, "name");
                int meshI = (int)MiniJson.Luku(solmu, "mesh").Value;

                var malli = new GlbMalli { Nimi = nimi, Osat = LueMeshinOsat(meshI) };
                if (malli.Osat.Count == 0) throw new DioraamaGlbVirhe("ei primitiivejä");

                // ERÄ 2B (kohta 4): koko solmuhierarkia — KAIKKI nodes[], ei vain ensimmäinen jolla on
                // mesh. Yksisolmuisella glb:llä (ei children-kenttiä) tästä tulee 1 alkio (kaikuu Nimi/Osat).
                malli.Solmut = LueSolmuhierarkia(solmut);
                foreach (var io in Lista("images"))
                {
                    var bvi = MiniJson.Luku(MiniJson.Objekti(io), "bufferView");
                    malli.Kuvat.Add(bvi.HasValue ? BufferView((int)bvi.Value) : null);
                }
                foreach (var so in Lista("skins")) malli.Skinit.Add(LueSkin(MiniJson.Objekti(so), solmut.Count));
                foreach (var ao in Lista("animations")) malli.Animaatiot.Add(LueAnimaatio(MiniJson.Objekti(ao), solmut.Count));
                return malli;
            }

            /// <summary>Yhden meshin primitiivit GlbOsa-listaksi: POSITION/NORMAL/TEXCOORD_0/COLOR_0/indeksit +
            /// unityyn-muunnos (z-peilaus, kiertosuunnan kääntö). ERIYTETTY omaksi metodiksi (ERÄ 2B) alkuperäisestä
            /// Kokoa()-silmukasta, jotta samaa lukulogiikkaa voi käyttää MYÖS solmuhierarkian jokaiselle mesh-
            /// solmulle — algoritmi itse EI muuttunut (vain siirretty paikoiltaan, vertaa DioraamaTestitin
            /// GlbLukijaJasennysJaVarit/GlbUnityynMuuntaaZnJaKiertosuunnan-testeihin, jotka eivät muuttuneet).</summary>
            List<GlbOsa> LueMeshinOsat(int meshI)
            {
                var mesh = Alkio("meshes", meshI);
                var materiaalit = Lista("materials");
                var osat = new List<GlbOsa>();
                foreach (var po in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(mesh, "primitives")))
                {
                    var p = MiniJson.Objekti(po);
                    if ((int)(MiniJson.Luku(p, "mode") ?? 4) != 4) throw new DioraamaGlbVirhe("vain kolmiot (mode 4)");
                    var a = MiniJson.Objekti(MiniJson.Kentta(p, "attributes"));
                    var pos = FloatVec(a, "POSITION", 3) ?? throw new DioraamaGlbVirhe("POSITION puuttuu");
                    var nor = FloatVec(a, "NORMAL", 3);
                    var tex = FloatVec(a, "TEXCOORD_0", 2);
                    var tex1 = FloatVec(a, "TEXCOORD_1", 2);
                    var vari = ColorVec(a, "COLOR_0");
                    int k = pos.Length / 3;

                    var paikat = new float[pos.Length];
                    for (int q = 0; q < k; q++)
                    {
                        paikat[q * 3] = pos[q * 3];
                        paikat[q * 3 + 1] = pos[q * 3 + 1];
                        paikat[q * 3 + 2] = unityyn ? -pos[q * 3 + 2] : pos[q * 3 + 2];
                    }
                    float[] normaalit = null;
                    if (nor != null)
                    {
                        normaalit = new float[nor.Length];
                        for (int q = 0; q < k; q++)
                        {
                            normaalit[q * 3] = nor[q * 3];
                            normaalit[q * 3 + 1] = nor[q * 3 + 1];
                            normaalit[q * 3 + 2] = unityyn ? -nor[q * 3 + 2] : nor[q * 3 + 2];
                        }
                    }

                    var ind = MiniJson.Luku(p, "indices");
                    var ii = ind.HasValue ? Indeksit((int)ind.Value) : Jarjestys(k);
                    if (ii.Length % 3 != 0) throw new DioraamaGlbVirhe("indeksit eivät ole kolmioita");
                    var kolmiot = new int[ii.Length];
                    for (int q = 0; q < ii.Length; q += 3)
                    {
                        if (ii[q] >= k || ii[q + 1] >= k || ii[q + 2] >= k) throw new DioraamaGlbVirhe("indeksi yli kärkien");
                        kolmiot[q] = ii[q];
                        kolmiot[q + 1] = unityyn ? ii[q + 2] : ii[q + 1];
                        kolmiot[q + 2] = unityyn ? ii[q + 1] : ii[q + 2];
                    }

                    // ERÄ 2B: materiaali luetaan KERRAN riippumatta siitä, tuliko pinta extrasista (aina näin
                    // hahmojen glb:ssä) — baseColorFactor (GlbOsa.Vari) tarvitaan kummassa tapauksessa tahansa.
                    Dictionary<string, object> materiaaliObj = null;
                    var matI = MiniJson.Luku(p, "material");
                    if (matI.HasValue && (int)matI.Value < materiaalit.Count) materiaaliObj = MiniJson.Objekti(materiaalit[(int)matI.Value]);
                    string pinta = MiniJson.Teksti(MiniJson.ObjektiTaiNull(MiniJson.Kentta(p, "extras")), "pinta");
                    if (pinta == null && materiaaliObj != null) pinta = MiniJson.Teksti(materiaaliObj, "name");
                    float[] materiaaliVari = materiaaliObj != null ? LueBaseColor(materiaaliObj) : null;
                    int kuva = -1;
                    var bct = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(materiaaliObj, "pbrMetallicRoughness")), "baseColorTexture"));
                    var texI = MiniJson.Luku(bct, "index");
                    if (texI.HasValue && (int)texI.Value < Lista("textures").Count)
                        kuva = (int)(MiniJson.Luku(MiniJson.Objekti(Lista("textures")[(int)texI.Value]), "source") ?? -1);
                    int Lahde(Dictionary<string, object> viite)
                    {
                        var i = MiniJson.Luku(viite, "index");
                        return i.HasValue && (int)i.Value < Lista("textures").Count ? (int)(MiniJson.Luku(MiniJson.Objekti(Lista("textures")[(int)i.Value]), "source") ?? -1) : -1;
                    }
                    int normaaliKuva = Lahde(MiniJson.ObjektiTaiNull(MiniJson.Kentta(materiaaliObj, "normalTexture")));
                    int ormKuva = Lahde(MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(materiaaliObj, "pbrMetallicRoughness")), "metallicRoughnessTexture")));

                    var nivelet = Nivelet(a, k);
                    var painot = nivelet != null ? Painot(a, k) : null;
                    if (nivelet != null && painot == null) throw new DioraamaGlbVirhe("JOINTS_0 ilman WEIGHTS_0:aa");
                    var osa = new GlbOsa { Pinta = pinta, Vari = materiaaliVari, Paikat = paikat, Normaalit = normaalit, Uv = tex, Uv1 = tex1, Kuva = kuva, NormaaliKuva = normaaliKuva, OrmKuva = ormKuva, KaksiPuolinen = materiaaliObj != null && MiniJson.Kentta(materiaaliObj, "doubleSided") is bool kp && kp, AlfaRaja = AlfaRajaMateriaalista(materiaaliObj), Varit = vari, Kolmiot = kolmiot, Nivelet = nivelet, Painot = painot };
                    // MORPH: vain POSITION-deltat (normaalit lasketaan muodoille Unityssa; FACEIT-vienti antaa vain POSITIONin).
                    var nimet = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(mesh, "extras")), "targetNames"));
                    int ti = 0;
                    foreach (var to in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(p, "targets")))
                    {
                        var d = FloatVec(MiniJson.Objekti(to), "POSITION", 3);
                        string nimi = ti < nimet.Count && nimet[ti] is string sn ? sn : "muoto" + ti;
                        ti++;
                        if (d == null) continue;
                        if (d.Length != paikat.Length) throw new DioraamaGlbVirhe("morph-kohteen kärkimäärä ei täsmää");
                        if (unityyn) for (int q = 2; q < d.Length; q += 3) d[q] = -d[q];
                        osa.Muodot.Add((nimi, d));
                    }
                    osat.Add(osa);
                }
                return osat;
            }

            /// <summary>KAIKKI nodes[] GlbSolmu-listaksi (ERÄ 2B). Vanhempi luetaan LAPSEN kautta: jokaisen
            /// solmun "children"-taulukko listaa lapsi-indeksit (kuten glb.mjs:n kirjoitaMonisolmuGlb
            /// kirjoittaa) — solmu, jota kukaan ei mainitse lapsenaan, on juuri (Vanhempi = -1).</summary>
            List<GlbSolmu> LueSolmuhierarkia(List<object> solmuJsonit)
            {
                int n = solmuJsonit.Count;
                var vanhempi = new int[n];
                for (int i = 0; i < n; i++) vanhempi[i] = -1;
                for (int i = 0; i < n; i++)
                {
                    var s = MiniJson.Objekti(solmuJsonit[i]);
                    foreach (var lapsiArvo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(s, "children")))
                    {
                        if (lapsiArvo is double d) { int lapsi = (int)d; if (lapsi >= 0 && lapsi < n) vanhempi[lapsi] = i; }
                    }
                }

                var tulos = new List<GlbSolmu>(n);
                for (int i = 0; i < n; i++)
                {
                    var s = MiniJson.Objekti(solmuJsonit[i]);
                    var g = new GlbSolmu
                    {
                        Nimi = MiniJson.Teksti(s, "name"),
                        Vanhempi = vanhempi[i],
                        Translation = LueTranslation(s),
                        Rotation = LueRotation(s),
                        Scale = LueVec(MiniJson.Kentta(s, "scale"), new[] { 1f, 1f, 1f }),
                        Extras = MiniJson.ObjektiTaiNull(MiniJson.Kentta(s, "extras")),
                    };
                    g.Skin = (int)(MiniJson.Luku(s, "skin") ?? -1);
                    var meshIn = MiniJson.Luku(s, "mesh");
                    g.Osat = meshIn.HasValue ? LueMeshinOsat((int)meshIn.Value) : new List<GlbOsa>();
                    tulos.Add(g);
                }
                return tulos;
            }

            /// <summary>materials[i].pbrMetallicRoughness.baseColorFactor [r,g,b,a] (LINEAARINEN) — null, jos
            /// materiaalilla ei ole pbrMetallicRoughness- tai baseColorFactor-kenttää (ei virhe: vanhat
            /// testifixturet ja rakennusosien glb:t, joissa väri tulee muualta, ks. GlbOsa.Vari-kommentti).</summary>
            static float[] LueBaseColor(Dictionary<string, object> materiaali)
            {
                var pbr = MiniJson.ObjektiTaiNull(MiniJson.Kentta(materiaali, "pbrMetallicRoughness"));
                var bcf = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(pbr, "baseColorFactor"));
                if (bcf.Count < 4) return null;
                var t = new float[4];
                for (int i = 0; i < 4; i++) t[i] = bcf[i] is double d ? (float)d : (i == 3 ? 1f : 0f);
                return t;
            }

            /// <summary>Lukee JSON-lukutaulukon float[]:ksi kiinteällä pituudella (oletus, jos kenttä puuttuu
            /// tai on lyhyempi kuin oletus.Length — per-komponentti, ei koko taulukolle kerralla).</summary>
            static float[] LueVec(object arvo, float[] oletus)
            {
                var l = MiniJson.TaulukkoTaiTyhja(arvo);
                var t = new float[oletus.Length];
                for (int i = 0; i < t.Length; i++) t[i] = l.Count > i && l[i] is double d ? (float)d : oletus[i];
                return t;
            }

            /// <summary>translation [x,y,z] (oletus [0,0,0]); unityyn: z negatoidaan (sama kuin POSITION).</summary>
            float[] LueTranslation(Dictionary<string, object> s)
            {
                var t = LueVec(MiniJson.Kentta(s, "translation"), new[] { 0f, 0f, 0f });
                if (unityyn) t[2] = -t[2];
                return t;
            }

            /// <summary>rotation-kvaternio [x,y,z,w] (oletus identiteetti [0,0,0,1]); unityyn: (x,y,−z,−w) —
            /// perustelu tiedoston yläkommentissa.</summary>
            float[] LueRotation(Dictionary<string, object> s)
            {
                var r = LueVec(MiniJson.Kentta(s, "rotation"), new[] { 0f, 0f, 0f, 1f });
                if (unityyn) { r[2] = -r[2]; r[3] = -r[3]; }
                return r;
            }

            GlbSkin LueSkin(Dictionary<string, object> s, int solmuja)
            {
                var nl = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(s, "joints"));
                var sk = new GlbSkin { Nivelet = new int[nl.Count], Luuranko = (int)(MiniJson.Luku(s, "skeleton") ?? -1) };
                for (int i = 0; i < nl.Count; i++)
                {
                    int n = nl[i] is double d ? (int)d : -1;
                    if (n < 0 || n >= solmuja) throw new DioraamaGlbVirhe("skin-nivel yli solmujen");
                    sk.Nivelet[i] = n;
                }
                var ibm = MiniJson.Luku(s, "inverseBindMatrices");
                var m = new float[nl.Count * 16];
                if (ibm.HasValue)
                {
                    var (alku, askel, maara, komponentit, tyyppi, _) = Accessor((int)ibm.Value);
                    if (tyyppi != 5126 || komponentit != 16 || maara < nl.Count) throw new DioraamaGlbVirhe("inverseBindMatrices ei ole float MAT4 × nivelet");
                    for (int q = 0; q < nl.Count; q++)
                        for (int c = 0; c < 16; c++)
                        {
                            float v = BitConverter.ToSingle(b, alku + q * askel + c * 4);
                            int rivi = c % 4, sarake = c / 4;
                            m[q * 16 + c] = unityyn && ((rivi == 2) != (sarake == 2)) ? -v : v;
                        }
                }
                else for (int q = 0; q < nl.Count; q++) { m[q * 16] = 1; m[q * 16 + 5] = 1; m[q * 16 + 10] = 1; m[q * 16 + 15] = 1; }
                sk.KaanteisetSidonnat = m;
                return sk;
            }

            GlbAnimaatio LueAnimaatio(Dictionary<string, object> a, int solmuja)
            {
                var anim = new GlbAnimaatio { Nimi = MiniJson.Teksti(a, "name") ?? "" };
                var naytteet = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(a, "samplers"));
                foreach (var ko in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(a, "channels")))
                {
                    var k = MiniJson.Objekti(ko);
                    var kohde = MiniJson.Objekti(MiniJson.Kentta(k, "target"));
                    var solmu = MiniJson.Luku(kohde, "node");
                    int polku = MiniJson.Teksti(kohde, "path") switch { "translation" => 0, "rotation" => 1, "scale" => 2, _ => -1 };
                    if (!solmu.HasValue || polku < 0 || (int)solmu.Value >= solmuja) continue; // weights (morph) ja tuntemattomat ohi
                    int si = (int)(MiniJson.Luku(k, "sampler") ?? -1);
                    if (si < 0 || si >= naytteet.Count) throw new DioraamaGlbVirhe("animaation sampler puuttuu");
                    var n = MiniJson.Objekti(naytteet[si]);
                    string interp = MiniJson.Teksti(n, "interpolation") ?? "LINEAR";
                    var ajat = FloatAccessor((int)(MiniJson.Luku(n, "input") ?? -1), 1);
                    int c = polku == 1 ? 4 : 3;
                    var raaka = FloatAccessor((int)(MiniJson.Luku(n, "output") ?? -1), c, polku == 1);
                    float[] arvot;
                    if (interp == "CUBICSPLINE")
                    {
                        if (raaka.Length != ajat.Length * 3 * c) throw new DioraamaGlbVirhe("CUBICSPLINE-arvojen määrä");
                        arvot = new float[ajat.Length * c];
                        for (int q = 0; q < ajat.Length; q++) Array.Copy(raaka, (q * 3 + 1) * c, arvot, q * c, c);
                    }
                    else arvot = raaka;
                    if (arvot.Length != ajat.Length * c) throw new DioraamaGlbVirhe("animaation arvojen määrä");
                    if (unityyn)
                        for (int q = 0; q < ajat.Length; q++)
                        {
                            if (polku == 0) arvot[q * 3 + 2] = -arvot[q * 3 + 2];
                            else if (polku == 1) { arvot[q * 4 + 2] = -arvot[q * 4 + 2]; arvot[q * 4 + 3] = -arvot[q * 4 + 3]; }
                        }
                    anim.Kanavat.Add(new GlbKanava { Solmu = (int)solmu.Value, Polku = polku, Ajat = ajat, Arvot = arvot, Askel = interp == "STEP" });
                    if (ajat.Length > 0) anim.Kesto = Math.Max(anim.Kesto, ajat[ajat.Length - 1]);
                }
                return anim;
            }

            /// <summary>Float-accessor (tai rotaatiolle normalisoitu kokonaisluku, glTF sallii sen) litteäksi taulukoksi.</summary>
            float[] FloatAccessor(int i, int komponenttejaOdotettu, bool normalisoituSallittu = false)
            {
                if (SparseFloat(i, komponenttejaOdotettu) is float[] sp) return sp;
                var (alku, askel, maara, komponentit, tyyppi, normalisoitu) = Accessor(i);
                if (komponentit != komponenttejaOdotettu) throw new DioraamaGlbVirhe("accessor " + i + " komponentit " + komponentit);
                var t = new float[maara * komponentit];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < komponentit; c++)
                        t[q * komponentit + c] = tyyppi == 5126 ? BitConverter.ToSingle(b, alku + q * askel + c * 4)
                            : normalisoituSallittu && normalisoitu ? Normalisoitu(tyyppi, alku + q * askel, c)
                            : throw new DioraamaGlbVirhe("accessor " + i + " ei ole float");
                return t;
            }

            float Normalisoitu(int tyyppi, int o, int c) => tyyppi switch
            {
                5120 => Math.Max((sbyte)b[o + c] / 127f, -1f),
                5121 => b[o + c] / 255f,
                5122 => Math.Max((short)(b[o + c * 2] | b[o + c * 2 + 1] << 8) / 32767f, -1f),
                5123 => (b[o + c * 2] | b[o + c * 2 + 1] << 8) / 65535f,
                _ => throw new DioraamaGlbVirhe("normalisoitu componentType " + tyyppi),
            };

            int[] Nivelet(Dictionary<string, object> attr, int karkia)
            {
                var i = MiniJson.Luku(attr, "JOINTS_0");
                if (!i.HasValue) return null;
                var (alku, askel, maara, komponentit, tyyppi, _) = Accessor((int)i.Value);
                if (komponentit != 4 || (tyyppi != 5121 && tyyppi != 5123) || maara != karkia) throw new DioraamaGlbVirhe("JOINTS_0 ei ole UNSIGNED_BYTE/SHORT VEC4");
                var t = new int[maara * 4];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < 4; c++)
                    {
                        int o = alku + q * askel;
                        t[q * 4 + c] = tyyppi == 5121 ? b[o + c] : b[o + c * 2] | b[o + c * 2 + 1] << 8;
                    }
                return t;
            }

            float[] Painot(Dictionary<string, object> attr, int karkia)
            {
                var i = MiniJson.Luku(attr, "WEIGHTS_0");
                if (!i.HasValue) return null;
                var (alku, askel, maara, komponentit, tyyppi, normalisoitu) = Accessor((int)i.Value);
                if (komponentit != 4 || maara != karkia || (tyyppi != 5126 && !normalisoitu)) throw new DioraamaGlbVirhe("WEIGHTS_0 ei ole float tai normalisoitu VEC4");
                var t = new float[maara * 4];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < 4; c++)
                        t[q * 4 + c] = tyyppi == 5126 ? BitConverter.ToSingle(b, alku + q * askel + c * 4) : Normalisoitu(tyyppi, alku + q * askel, c);
                return t;
            }

            static int[] Jarjestys(int n) { var t = new int[n]; for (int i = 0; i < n; i++) t[i] = i; return t; }

            /// <summary>Accessorin tavualue: (alku, askel, määrä, komponentit, componentType, normalized).</summary>
            (int alku, int askel, int maara, int komponentit, int tyyppi, bool normalisoitu) Accessor(int i)
            {
                var a = Alkio("accessors", i);
                if (MiniJson.Kentta(a, "sparse") != null) throw new DioraamaGlbVirhe("sparse ei tuettu");
                int tyyppi = (int)(MiniJson.Luku(a, "componentType") ?? 0);
                int maara = (int)(MiniJson.Luku(a, "count") ?? 0);
                int komponentit = MiniJson.Teksti(a, "type") switch
                {
                    "SCALAR" => 1, "VEC2" => 2, "VEC3" => 3, "VEC4" => 4, "MAT4" => 16,
                    var x => throw new DioraamaGlbVirhe("accessor-tyyppi " + x),
                };
                int koko = tyyppi switch { 5120 => 1, 5121 => 1, 5122 => 2, 5123 => 2, 5125 => 4, 5126 => 4, _ => throw new DioraamaGlbVirhe("componentType " + tyyppi) };
                var bvi = MiniJson.Luku(a, "bufferView") ?? throw new DioraamaGlbVirhe("accessor ilman bufferViewiä (ulkoinen data ei tuettu)");
                var bv = Alkio("bufferViews", (int)bvi);
                if ((int)(MiniJson.Luku(bv, "buffer") ?? 0) != 0 || binAlku < 0)
                    throw new DioraamaGlbVirhe("vain upotettu BIN-puskuri (ulkoiset tiedostot eivät tuettu)");
                int bvAlku = (int)(MiniJson.Luku(bv, "byteOffset") ?? 0), bvPituus = (int)(MiniJson.Luku(bv, "byteLength") ?? 0);
                int askel = (int)(MiniJson.Luku(bv, "byteStride") ?? 0);
                if (askel == 0) askel = koko * komponentit;
                int alku = bvAlku + (int)(MiniJson.Luku(a, "byteOffset") ?? 0);
                long loppu = maara == 0 ? alku : (long)alku + (long)askel * (maara - 1) + koko * komponentit;
                if (bvAlku + bvPituus > binPituus || loppu > bvAlku + bvPituus) throw new DioraamaGlbVirhe("accessor yli puskurin");
                return (binAlku + alku, askel, maara, komponentit, tyyppi, MiniJson.Totuus(a, "normalized"));
            }

            /// <summary>Sparse float-accessor (glTF 2.0 accessor.sparse; LR:n MetaHuman-vienti 9.10.: ARKit-muotoavaimet): pohja bufferViewistä
            /// tai nollina, päälle harvat indeksit (UNSIGNED_BYTE/SHORT/INT) ja arvot (float). null = ei sparse.</summary>
            float[] SparseFloat(int i, int komponenttejaOdotettu)
            {
                var a = Alkio("accessors", i);
                var sp = MiniJson.ObjektiTaiNull(MiniJson.Kentta(a, "sparse"));
                if (sp == null) return null;
                if ((int)(MiniJson.Luku(a, "componentType") ?? 0) != 5126) throw new DioraamaGlbVirhe("sparse vain float");
                int maara = (int)(MiniJson.Luku(a, "count") ?? 0), k = komponenttejaOdotettu;
                var t = new float[maara * k];
                if (MiniJson.Luku(a, "bufferView") is double bvi)
                {
                    var (bAlku, bAskel) = Nakyma((int)bvi, (int)(MiniJson.Luku(a, "byteOffset") ?? 0), k * 4);
                    if ((long)bAlku + (long)bAskel * Math.Max(0, maara - 1) + k * 4 > binAlku + binPituus) throw new DioraamaGlbVirhe("sparse-pohja yli puskurin");
                    for (int q = 0; q < maara; q++) for (int c = 0; c < k; c++) t[q * k + c] = BitConverter.ToSingle(b, bAlku + q * bAskel + c * 4);
                }
                int n = (int)(MiniJson.Luku(sp, "count") ?? 0);
                var ind = MiniJson.ObjektiTaiNull(MiniJson.Kentta(sp, "indices")); var arv = MiniJson.ObjektiTaiNull(MiniJson.Kentta(sp, "values"));
                if (ind == null || arv == null) throw new DioraamaGlbVirhe("sparse ilman indices/values");
                int it = (int)(MiniJson.Luku(ind, "componentType") ?? 0), ik = it == 5121 ? 1 : it == 5123 ? 2 : it == 5125 ? 4 : throw new DioraamaGlbVirhe("sparse-indeksit " + it);
                var (iAlku, _) = Nakyma((int)(MiniJson.Luku(ind, "bufferView") ?? -1), (int)(MiniJson.Luku(ind, "byteOffset") ?? 0), ik);
                var (vAlku, _) = Nakyma((int)(MiniJson.Luku(arv, "bufferView") ?? -1), (int)(MiniJson.Luku(arv, "byteOffset") ?? 0), k * 4);
                if ((long)iAlku + (long)n * ik > binAlku + binPituus || (long)vAlku + (long)n * k * 4 > binAlku + binPituus) throw new DioraamaGlbVirhe("sparse yli puskurin");
                for (int s = 0; s < n; s++)
                {
                    int o = iAlku + s * ik;
                    long x = ik == 1 ? b[o] : ik == 2 ? b[o] | b[o + 1] << 8 : U32(b, o);
                    if (x < 0 || x >= maara) throw new DioraamaGlbVirhe("sparse-indeksi yli");
                    for (int c = 0; c < k; c++) t[x * k + c] = BitConverter.ToSingle(b, vAlku + (s * k + c) * 4);
                }
                return t;
            }

            /// <summary>bufferViewin absoluuttinen alku (+ siirto) ja askel (byteStride tai tiivis).</summary>
            (int alku, int askel) Nakyma(int bvi, int siirto, int tiivis)
            {
                var bv = Alkio("bufferViews", bvi);
                if ((int)(MiniJson.Luku(bv, "buffer") ?? 0) != 0 || binAlku < 0) throw new DioraamaGlbVirhe("vain upotettu BIN-puskuri");
                int askel = (int)(MiniJson.Luku(bv, "byteStride") ?? 0);
                return (binAlku + (int)(MiniJson.Luku(bv, "byteOffset") ?? 0) + siirto, askel == 0 ? tiivis : askel);
            }

            float[] FloatVec(Dictionary<string, object> attr, string nimi, int komponenttejaOdotettu)
            {
                var i = MiniJson.Luku(attr, nimi);
                if (!i.HasValue) return null;
                if (SparseFloat((int)i.Value, komponenttejaOdotettu) is float[] sp) return sp;
                var (alku, askel, maara, komponentit, tyyppi, _) = Accessor((int)i.Value);
                if (tyyppi != 5126 || komponentit != komponenttejaOdotettu) throw new DioraamaGlbVirhe(nimi + " ei ole float VEC" + komponenttejaOdotettu);
                var t = new float[maara * komponentit];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < komponentit; c++)
                        t[q * komponentit + c] = BitConverter.ToSingle(b, alku + q * askel + c * 4);
                return t;
            }

            /// <summary>COLOR_0: UNSIGNED_BYTE normalized VEC4 (kohta 3) → raa'at tavut RGBA sellaisinaan. LINNA: myös
            /// Blenderin UNSIGNED_SHORT normalized VEC4 (yläbitit tavuiksi) ja float VEC3/VEC4 (skinnatut hahmot).</summary>
            byte[] ColorVec(Dictionary<string, object> attr, string nimi)
            {
                var i = MiniJson.Luku(attr, nimi);
                if (!i.HasValue) return null;
                var (alku, askel, maara, komponentit, tyyppi, normalisoitu) = Accessor((int)i.Value);
                if (tyyppi == 5126 && (komponentit == 3 || komponentit == 4))
                {
                    // Skinnattujen hahmojen Blender-vienti: float VEC3/VEC4 (0–1) → tavut, alfa 255 VEC3:lle.
                    var f = new byte[maara * 4];
                    for (int q = 0; q < maara; q++)
                        for (int c = 0; c < 4; c++)
                            f[q * 4 + c] = c < komponentit ? (byte)Math.Round(Math.Clamp(BitConverter.ToSingle(b, alku + q * askel + c * 4), 0f, 1f) * 255f) : (byte)255;
                    return f;
                }
                if ((tyyppi != 5121 && tyyppi != 5123) || komponentit != 4 || !normalisoitu) throw new DioraamaGlbVirhe(nimi + " ei ole normalisoitu UNSIGNED_BYTE/SHORT VEC4");
                var t = new byte[maara * 4];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < 4; c++)
                        t[q * 4 + c] = tyyppi == 5121 ? b[alku + q * askel + c] : b[alku + q * askel + c * 2 + 1];
                return t;
            }

            /// <summary>bufferViewin tavut kopiona (upotettu kuva).</summary>
            byte[] BufferView(int i)
            {
                var bv = Alkio("bufferViews", i);
                if ((int)(MiniJson.Luku(bv, "buffer") ?? 0) != 0 || binAlku < 0) throw new DioraamaGlbVirhe("vain upotettu BIN-puskuri");
                int alku = (int)(MiniJson.Luku(bv, "byteOffset") ?? 0), pituus = (int)(MiniJson.Luku(bv, "byteLength") ?? 0);
                if (alku < 0 || pituus < 0 || alku + pituus > binPituus) throw new DioraamaGlbVirhe("bufferView yli puskurin");
                var t = new byte[pituus];
                Array.Copy(b, binAlku + alku, t, 0, pituus);
                return t;
            }

            int[] Indeksit(int i)
            {
                var (alku, askel, maara, komponentit, tyyppi, _) = Accessor(i);
                if (komponentit != 1 || tyyppi == 5126) throw new DioraamaGlbVirhe("indeksit eivät ole kokonaislukuja");
                var t = new int[maara];
                for (int q = 0; q < maara; q++)
                {
                    int o = alku + q * askel;
                    t[q] = tyyppi switch
                    {
                        5121 => b[o],
                        5123 => b[o] | b[o + 1] << 8,
                        5125 => (int)U32(b, o),
                        _ => throw new DioraamaGlbVirhe("indeksien componentType " + tyyppi),
                    };
                    if (t[q] < 0) throw new DioraamaGlbVirhe("indeksi liian suuri");
                }
                return t;
            }
        }
    }

    public sealed class DioraamaGlbVirhe : Exception
    {
        public DioraamaGlbVirhe(string viesti) : base("Dioraama GLB: " + viesti) { }
    }
}
