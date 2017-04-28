class SpyController {
    def scaffold = Spy

    def index = {
        def spys = Spy.findAll()
        return [spys: spys]
    }
}