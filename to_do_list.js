let todos = new Vue({
    el:"#todobox",
    data:{
        arr:[],
        num_id:0,
        todo_text:"",
        list:"all",
        del_btn:false,
        refresh:false,
        saved_data:false
    },
    created(){
        let save_data = localStorage.getItem('vue_to_do_list_data');
        if(save_data!=null){
            this.arr = JSON.parse(save_data);
            this.saved_data = true;
            this.num_id = this.arr[this.arr.length-1][2]+1;
            this.del_btn =true;
        }
    },
    updated(){

    },
    watch:{
        refresh:function(){
            if(this.refresh){
                this.refresh = false;
            }
        },
        arr:function(){
            if(this.arr.length==0){
                localStorage.removeItem('vue_to_do_list_data')
            }
            else{
                todos.save_data();
            }
        }
    },
    methods:{
        add_todos(){
            this.del_btn = true;
            if(!this.todo_text){
                alert("please add To Do List");
                this.$refs.f_text.focus();
            }
            else{
                this.arr.push([this.todo_text, "yet", this.num_id]);
                this.todo_text="";
                this.num_id++;
            }
        },
        save_data(){
            localStorage.setItem('vue_to_do_list_data',JSON.stringify(this.arr));
            this.saved_data = true;
        },
        imdone(nid){
            for(let i in this.arr){
                if(this.arr[i][2]==nid){
                    if(this.arr[i][1] == "yet"){
                        document.getElementById("dotolist").childNodes[i].className = "done";
                        this.arr[i][1] = "done";
                        
                    }
                    else{
                        document.getElementById("dotolist").childNodes[i].className = "yet";
                        this.arr[i][1] = "yet";
                    }
                    todos.save_data();
                }
            }
            this.refresh = true;
        },
        del_todo(nid){
            for(let i in this.arr){
                if(this.arr[i][2] == nid){
                    todos.arr.splice(i,1);
                }
            }
            if(this.arr.length==0){
                this.del_btn = false;
            }
        },
        del_all(){
            if(confirm("Do you REALLY want to delete ALL?")){
                this.del_btn = false;
                this.arr=[];
            }
        }
    }
});