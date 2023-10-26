using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Threading.Tasks;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsApiClient itemsApi;

        public ItemsController(IItemsApiClient itemsApi)
        {
            this.itemsApi = itemsApi;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                var items = await itemsApi.GetItemsAsync();
                if (items != null)
                {
                    return this.Ok(items);
                }
            }
            catch (System.Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Items not found.");
        }

        // GET: ItemsController
        //public ActionResult Index()
        //{
        //    return View();
        //}

        //// GET: ItemsController/Details/5
        //public ActionResult Details(int id)
        //{
        //    return View();
        //}

        //// GET: ItemsController/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: ItemsController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: ItemsController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        //// POST: ItemsController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: ItemsController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        //// POST: ItemsController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
