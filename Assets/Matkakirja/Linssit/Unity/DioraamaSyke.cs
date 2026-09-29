// DIORAAMAN SYKKIVÄ VIHJE (elävä linna, käsikirjoitus 29.9. kohta 2; Siirtoseppä): ensimmäisellä käynnillä tilan, jolla
// elava.vihje = true, elävä kohde sykkii yleisnäkymässä (DioraamaSyke.shader), kunnes pelaaja on kerran avannut minkä
// tahansa tilan (muistetaan laitteeseen, "poikki vihje alusta" nollaa). Näkyy vasta saapumiskaaren jälkeen ja häivyttyy
// 0,4 s:ssa sisään ja ulos.
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaSyke
    {
        const string Avain = "dioraama-vihje-nahty";
        static readonly int IdKoko = Shader.PropertyToID("_Koko"), IdPeitto = Shader.PropertyToID("_Peitto"), IdAika = Shader.PropertyToID("_Aika");

        public static bool Nahty
        {
            get => PlayerPrefs.GetInt(Avain, 0) == 1;
            set { PlayerPrefs.SetInt(Avain, value ? 1 : 0); PlayerPrefs.Save(); }
        }

        readonly Transform juuri;
        readonly Shader varjostin;
        GameObject go;
        Material m;
        Mesh mesh;
        float peitto;
        string tilaId;

        public DioraamaSyke(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaSyke");
        }

        /// <summary>Joka ruutu: nakyvissa = yleisnäkymä ja saapuminen valmis; kohdistettu = pelaaja avasi tilan.</summary>
        public void Paivita(Rakennus rakennus, bool nakyvissa, bool kohdistettu, double t, bool vahennettyLiike)
        {
            if (kohdistettu && !Nahty) Nahty = true;
            var tila = !Nahty && rakennus?.Tilat != null ? rakennus.Tilat.Find(x => x.Elava != null && x.Elava.Vihje) : null;
            float tavoite = tila != null && nakyvissa ? 1f : 0f;
            peitto = Mathf.MoveTowards(peitto, tavoite, Time.unscaledDeltaTime / 0.4f);
            if (peitto <= 0f) { if (go != null) go.SetActive(false); return; }
            if (varjostin == null || tila == null && go == null) return;
            if (go == null)
            {
                mesh = new Mesh { name = "DioraamaSyke" };
                mesh.SetVertices(new[] { Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero });
                mesh.SetUVs(0, new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) });
                mesh.SetTriangles(new[] { 0, 1, 2, 0, 2, 3 }, 0);
                mesh.bounds = new Bounds(Vector3.zero, Vector3.one * 40f);
                m = new Material(varjostin) { name = "DioraamaSyke" };
                go = new GameObject("Syke") { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = m;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
            }
            if (tila != null && tila.Id != tilaId)
            {
                tilaId = tila.Id;
                go.transform.position = DioraamaNayttamo.UnityPiste(tila.Elava.Kohde);
                m.SetFloat(IdKoko, Mathf.Max(3f, (float)tila.Elava.Sade * 1.4f));
            }
            go.SetActive(true);
            m.SetFloat(IdPeitto, peitto);
            m.SetFloat(IdAika, vahennettyLiike ? 0.4f : (float)(t % 3600.0));
        }

        public void Tyhjenna()
        {
            if (go != null) Object.Destroy(go);
            if (m != null) Object.Destroy(m);
            if (mesh != null) Object.Destroy(mesh);
            go = null; m = null; mesh = null; tilaId = null; peitto = 0f;
        }
    }
}
