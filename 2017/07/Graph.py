class Graph:
    nodes = []

    def append(self, node):
        self.nodes.append(node)

    def get_by_name(self, node_name):
        return list(filter(lambda node: node.name == node_name, self.nodes))[0]

    def get_parent_node(self, node_name):
        ret = list(filter(lambda node: node_name in node.children, self.nodes))
        return ret if len(ret) > 0 else None

    def get_root_node(self):
        return list(filter(lambda node: self.get_parent_node(node.name) is None and node.children, self.nodes))[0]

    def calculate_weights(self, node=None):
        if node is None:
            node = self.get_root_node()

        node.overall_weight = node.weight
        for child in node.children:
            child_node = self.get_by_name(child)
            child_node.overall_weight += self.calculate_weights(child_node)
            node.overall_weight += child_node.overall_weight

        return node.overall_weight

    def is_node_balanced(self, node):
        weights = set([self.get_by_name(child).overall_weight for child in node.children])
        return len(weights) == 1

    def find_unbalanced(self, node=None):
        if node is None:
            node = self.get_root_node()

        for child in node.children:
            child_node = self.get_by_name(child)
            if not self.is_node_balanced(child_node):
                return self.find_unbalanced(child_node)

        return node

    def __repr__(self):
        """ Debug purposes """
        return "\n".join([repr(node) for node in self.nodes])
