class SpyController {
    def scaffold = Spy

    //Get all spys and return them
    def index = {
        def spys = Spy.findAll()
        return [spys: spys]
    }
}